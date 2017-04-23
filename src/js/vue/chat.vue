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
                <button v-on:click="deleteMessage()">X</button>{{ message.message }}<br>
                <small>{{ message.username }}, {{ message.createdAt | date }}</small>
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
                messages: []
            }
        },
        methods: {
            sendMessage: function(message, username) {
                const messagesRef = firebase.database().ref('messages').push();

                this.myMessageRef = messagesRef;
                let chatMessage = {
                    message,
                    username,
                    createdAt: (new Date()).getTime(),
                    messageRef
                };


                messagesRef.set(chatMessage).catch(function(error) {
                    console.error(error);
                }).then(() => {
                    this.message = '';
                    console.log('wrote data to database', chatMessage);
                });
            },
            deleteMessage: function(ref){
                /*ref.remove(function(error) {
                    alert(error ? "Uh oh!" : "Success!");
                });*/
                console.log("delet");
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
                        console.log(childData);
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