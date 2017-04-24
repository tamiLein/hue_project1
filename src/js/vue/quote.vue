<template lang="html">
    <div id="quote">
        {{text}}
    </div>
</template>


<script>

    module.exports = {
        data: function() {
            return {
                text: ''
            }
        },
        methods: {
            changeName: function (event) {
                this.name = event.target.value;
                event.target.blur();
                localStorage.setItem('name', this.name)
            },
        },
        mounted: function(){
            var that = this;
            //var url = 'http://www.zitate-online.de/zufallszitat.js.php';
            var url = 'https://taeglicheszit.at/zitat-api.php?format=string';

            $.get(url, function(data){
                var jsondata = JSON.stringify(data);
                that.text = data;
            });
        },
    };


</script>