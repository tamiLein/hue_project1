<template lang="html">
    <div id="workout">
        <h2>Übung des Tages: {{name}}</h2>
        <b>Startposition:</b>  <ul><li v-for="item in start">- {{item}}</li></ul><br>
        <b>Beschreibung:</b><ul><li v-for="item in description">- {{item}}</li></ul><br>

        <b>Muskeln:</b> <i v-for="item in muscles">- {{item}}</i>
    </div>
</template>


<script>
    module.exports = {
        data: function() {
            return {
                description: '',
                muscles: '',
                name: '',
                start:''
            }
        },
        mounted: function () {
            console.log("mounted workout");
            var that = this;

            var random = Math.floor(Math.random()*5);
            /*var url = 'https://wger.de/api/v2/exercise/?format=json&language=1';
             console.log(url);

             $.get( url, function( data ) {
             var exercise = data.results[Math.floor((Math.random()*20)+1)];
             that.name = exercise['name'];
             that.description = exercise['description'];
             that.description = that.description.replace(/<(?:.|\n)*?>/gm, '');
             that.muscles = exercise['muscles'];
             });*/

            var url = "../json/workout.json";
            $.get(url, function(data){
                that.name = data.exercises[random].name;
                that.start = data.exercises[random].startPosition;
                that.description = data.exercises[random].description;
                that.muscles = data.exercises[random].muscles;
            });
        }
    };


</script>