<template lang="html">
    <div>
        <h1>Chat!</h1>

        <div>
            status: {{ status }}
        </div>
        <div>
            <input v-model="username">
        </div>
        <ul>
            <li v-for="message in messages">
                {{ message.message }}<br>
                <small>{{ message.username }}, {{ message.createdAt | date }}</small>
            </li>
        </ul>

        <form v-on:submit.prevent="sendMessage(message, username)">
            <input v-model="message">
            <button type="submit">Send</button>
        </form>
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
            }
        },
        mounted: function() {
            firebase.auth().signInAnonymously().catch(function(error) {
                console.error(error.message);
            }).then(() => {
                this.status = "signed in";

                firebase.database().ref('messages').on('value', (snapshot) => {
                    console.log('snapshot', snapshot);

                    let newMessages = [];
                    snapshot.forEach((childSnapshot) => {
                        //var childKey = childSnapshot.key;
                        var childData = childSnapshot.val();
                        newMessages.push(childData);
                    });

                    this.messages = newMessages;
                });
            });
        }
    };
</script>

<style lang="sass" scoped>
    div {
        background-color: #efefef;
        padding: 10px;
        margin: 10px 0;
    }
</style>