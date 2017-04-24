<template lang="html">
    <div id="chat">
        <h1>Chat</h1>

        <div>
            status: {{ status }}
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
                myMessageRef: '',
                messages: [

                ]
            }
        },
        methods: {
            sendMessage: function(message, username) {
                const messagesRef = firebase.database().ref('messages').push();

                this.myMessageRef = messagesRef;
                console.log('Ref ' + messagesRef);
                let chatMessage = {
                    message,
                    username,
                    createdAt: (new Date()).getTime()
                };

                messagesRef.set(chatMessage).catch(function(error) {
                    console.error(error);
                }).then(() => {
                    this.message = '';
                    console.log('wrote data to database', chatMessage);
                });
            },
            deleteMessage: function(key){
                firebase.database().ref('messages').child(key).remove();
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
                        var childKey = childSnapshot.key;
                        var childData = childSnapshot.val();
                        console.log(childData);
                        newMessages.push({childKey, childData});
                    });
                    console.log(newMessages);
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