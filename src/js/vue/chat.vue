<template lang="html">
    <div id="chat">
        <h2>Chat</h2>

        <div>
            Status: {{ status }}
        </div>
        <div class="username">
            <input v-model="username">
        </div>
        <form v-on:submit.prevent="sendMessage(message, username)">
            <input v-model="message">
            <button type="submit">Send</button>
        </form>
        <ul>
            <li v-for="message in messages">
                <button v-on:click='deleteMessage(message.childKey)'>X</button>{{ message.childData.message }}<br>
                <small>{{ message.childData.username }}, {{ message.childData.createdAt | date }}</small>
            </li>
        </ul>
    </div>
</template>

<script>
    import firebase from '../lib/firebase';

    export default {
        data: function() {
            return {
                status: '-',
                username: 'Unknown',
                message: '',
                messages: []
            }
        },
        methods: {
            sendMessage: function(message, username) {
                let chatMessage = {
                    message,
                    username,
                    createdAt: (new Date()).getTime()
                };

                const messagesRef = firebase.database().ref('messages').push();
                messagesRef.set(chatMessage).catch(function(error) {
                    console.error(error);
                }).then(() => {
                    this.message = '';
                    console.log('wrote data to database', chatMessage);
                });
            },
            deleteMessage: function(key){
                firebase.database().ref('messages').child(key).remove().catch(function(error) {
                    console.log(error);
                }).then(() => {
                    console.log('message deleted');
                });
            }
        },
        mounted: function() {
            firebase.auth().signInAnonymously().catch(function(error) {
                console.error(error.message);
            }).then(() => {
                this.status = "online";

                firebase.database().ref('messages').on('value', (snapshot) => {
                    console.log('snapshot', snapshot);

                    let newMessages = [];
                    snapshot.forEach((childSnapshot) => {
                        var childKey = childSnapshot.key;
                        var childData = childSnapshot.val();
                        newMessages.unshift({childKey, childData});
                    });

                    this.messages = newMessages;
                });
            });
        }
    };
</script>

<style lang="sass" scoped>

</style>