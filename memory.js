
      var memory_array = ['A', 'A', 'B', 'B', 'C', 'C', 'D', 'D', 'E', 'E', 'F', 'F', 'G', 'G', 'H', 'H', 'I', 'I', 'J', 'J', 'K', 'K', 'L', 'L'] //holds content under cards
      var memory_values = []; //storing memory values
      var memory_tile_ids = []; //stores memory tile ids
      var tiles_flipped = []; //keeps track of how many tiles are flipped

      // JS has not shuffle method, so we add one to all Array objects
      Array.prototype.memory_tile_shuffle = function(){
        var i = this.length, j, temp;
        while(--i > 0){
          j = Math.floor(Math.random() * (i+1));
          temp = this[j];
          this[j] = this[i];
          this[i] = temp;
        }
      }

      function newBoard(){
        tiles_flipped = 0;
        var output = '';
        memory_array.memory_tile_shuffle();
        for(var i = 0; i < memory_array.length; i++){
          output += '<div id="tile_'+i+'" onclick="memoryFlipTile(this,\''+memory_array[i]+'\')"></div>';
        }
        document.getElementById('memory_board').innerHTML = output;
      }

      function memoryFlipTile(tile, val){
        if(tile.innerHTML == "" && memory_values.length < 2){
          tile.style.background = '#fff';
          tile.innerHTML = val;
          if(memory_values.length == 0){
            memory_values.push(val);
            memory_tile_ids.push(tile.id);
          } else if(memory_values.length == 1){
            memory_values.push(val);
            memory_tile_ids.push(tile.id);
            // grabs two tiles in memory and compares to see if they are a match
            if(memory_values[0] == memory_values[1]){
              tiles_flipped += 2;
              // clear both arrays to prepare for new matching sequence
              memory_values = [];
              memory_tile_ids = [];
              // check to see if the whole board is cleared
              if(tiles_flipped == memory_array.length){
                alert("Board cleared...generating new board");
                document.getElementById('memory_board').innerHTML = "";
                newBoard();
              }
            } else {
              function flip2back(){
                // flip the 2 tiles back over if no match made
                var tile_1 = document.getElementById(memory_tile_ids[0]);
                var tile_2 = document.getElementById(memory_tile_ids[1]);
                tile_1.style.background = 'red';
                tile_1.innerHTML = "";
                tile_2.style.background = 'red';
                tile_2.innerHTML = "";
                // clear both arrays
                memory_values = [];
                memory_tile_ids = [];
              }
              setTimeout(flip2back, 700);
            }
          }
        }
      }

