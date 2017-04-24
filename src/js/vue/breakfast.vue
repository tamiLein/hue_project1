<template lang="html">
    <div id="breakfast">
        <h2>Dein heutiges Frühstück:</h2>
        <div class="col-md-6 col-sm-6 col-xs-6 padding">
            <label for="schlaf">so lange hab ich geschlafen:</label> {{sleepInfo[sleep]}}
            <input id="schlaf" type="range" v-model="sleep" min="1" max="3" >

            <label for="muede">so müde fühl' ich mich heute:</label> {{muedeInfo[muede]}}
            <input id="muede" type="range" v-model="muede" min="1" max="2">
            <label for="work">so viel hab ich heute zu tun:</label> {{workToDo[work]}}
            <input id="work" type="range" v-model="work" min="1" max="2">
        </div>
        <div class="col-md-6 col-sm-6 col-xs-6 img-breakfast">
            <img v-bind:src="'../img/fruehstueck/'+sleep+'-'+muede+'-'+work+'.png'" width="auto" height="200px">
        </div>
    </div>
</template>


<script>
    module.exports = {
        data: function() {
            return {
                sleep: '1',
                sleepInfo: ['', 'zu wenig', 'genug', 'länger als sonst'],
                muede: '1',
                muedeInfo: ['', 'sehr müde', 'ausgeschlafen'],
                work: '1',
                workToDo: ['', 'wenig', 'unüberschaubar']
            }
        },
        mounted: function () {

        }
    };


</script>