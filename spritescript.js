 //This script handles the sprite animation of the torches on the top of each page.
 (function(){ "use strict";
    var display_left = {
        canv: document.getElementById("l-canvas"),
        cont: document.getElementById("l-canvas").getContext("2d"),
    }

    var display_right = {
        canv: document.getElementById("r-canvas"),
        cont: document.getElementById("r-canvas").getContext("2d"),
    }

    //Animation class constructor
    var Animation = function(frame_set, delay){
        this.count = 0;
        this.delay = delay;
        this.frame = 0;
        this.frame_index = 0;
        this.frame_set = frame_set;
    }

    //Animation functions
    Animation.prototype = {

        change: function(frame_set, delay){
            if(this.frame_set != frame_set){
                this.count = 0;
                this.delay = delay;
                this.frame_index = 0;
                this.frame_set = frame_set;
                this.frame = this.frame_set[this.frame_index];
            }
        },

        //The function that does the work. Will loop through a frame set and change the
        //current image tied to the object referenced
        update: function(){
            this.count ++;

            if (this.count >= this.delay) {
                this.count = 0;
                this.frame_index = (this.frame_index == this.frame_set.length - 1) ? 0 : this.frame_index + 1;
                this.frame = this.frame_set[this.frame_index];
            }
        }
    }

    var torch = {

        anim: new Animation(),
        height: 66,
        width: 30,
    }

    var t_sheet = {
        image: new Image(),
        frame_list: [0, 1, 2, 3, 4],
        frame_num: 5
    }

    t_sheet.image.src = "torchsheet.png";

    var render = function() {

        //Calculate where to cut sprite sheet
        var srcX = (torch.anim.frame % t_sheet.frame_num) * torch.width;

        display_left.cont.drawImage(t_sheet.image, srcX, 0, torch.width, torch.height,
                               0, 0, torch.width, torch.height);   
        display_right.cont.drawImage(t_sheet.image, srcX, 0, torch.width, torch.height,
                               0, 0, torch.width, torch.height);
    }

    var request;

    //Animation loop
    var loop = function() {
        display_left.cont.clearRect(0, 0, display_left.canv.width, display_left.canv.height);
        display_right.cont.clearRect(0, 0, display_right.canv.width, display_right.canv.height);
        render();
        torch.anim.update();
        request = window.requestAnimationFrame(loop);
    }

    torch.anim.change(t_sheet.frame_list, 6);
    request = window.requestAnimationFrame(loop);

 })();