<template lang="html">
    <div>
        <h2>Dein heutiges Frühstück:</h2>
        <div class="col-md-6">
            <label for="schlaf">so lange hab ich geschlafen:</label> {{sleep}} Stunden
            <input id="schlaf" type="range" v-model="sleep" min="1" max="3" >

            <label for="muede">so müde fühl' ich mich heute:</label> {{muede}}
            <input id="muede" type="range" v-model="muede" min="0" max="1">
            <label for="work">so viel hab ich heute zu tun:</label> {{workToDo[work]}}
            <input id="work" type="range" v-model="work" min="0" max="1">
        </div>
        <div class="col-md-6"><img v-bind:src="'../img/fruehstueck/'+sleep+'-'+muede+'-'+work+'.png'" width="auto" height="200px"></div>
    </div>
</template>


<script>
    module.exports = {
        data: function() {
            return {
                sleep: '1',
                muede: '1',
                work: '1',
                workToDo: ['wenig', 'unüberschaubar']
            }
        },
        mounted: function () {
            console.log("mounted breakfast");
            console.log(this.sleep + " sleep");
            console.log(" sleep");
        }
    };


</script>