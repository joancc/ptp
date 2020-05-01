var player; // Declare object
var playerImg; // Declare variable 'img'.
var target;
var numSteps = 1; //Number of steps ahead of the cat
var isPlayerMoving = false;
var currentLevel = 0;
var obstacles = [];
var start = false; //Used to determine if code from block stacks is attached to Start block and should be executed
var tipToShow = 1; //Loop through available hints
var totalNumTips;

//Challenge task specific
var emptyCells;

//Movement animation var
var animationSpeed = 10;
var frames = 30;
var animationCounter = 0;
//var universalAnimationCounter = 0;
var animationsArray = [];

//Read by blockly iframe using parent.var
var controls_whileUntil_options;

//Levels
var level1;
var level2;
var level3;

function preload() {
  console.log("Preloading");
  playerImg = loadImage("../images/cat.png"); // Load world 1 image
  playerImg2 = loadImage("../images/bogo.png"); // Load world 2 image
  playerImg3 = loadImage("../images/triangleIsoceles.png"); // Load challenge taskimage
}

function setup() {
  //var myCanvas = createCanvas(400, 400);
  var myCanvas = createCanvas(windowWidth, windowHeight);
  myCanvas.parent("p5Container");
  //LoadLevel1();
  noLoop();
}

function draw() {
  if (currentLevel <= 20) {
    background(100, 100, 100);

    target.display();

    player.display();

    if (obstacles.length > 0) {
      for (var i = 0; i < obstacles.length; i++) {
        obstacles[i].display();
      }
    }

    DrawSteps();
  } else if (currentLevel < 99) {
    background(150, 50, 100);

    target.display();

    player.display();

    if (obstacles.length > 0) {
      for (var i = 0; i < obstacles.length; i++) {
        obstacles[i].display();
      }
    }

    DrawSteps();
  } else {
    //CHALLENGE TASK
    background(100, 100, 100);

    target.display();

    player.display();

    if (obstacles.length > 0) {
      for (var i = 0; i < obstacles.length; i++) {
        //obstacles[i].display();
        if (obstacles[i].fill) {
          fill(obstacles[i].color);
        } else {
          noFill();
        }
        ellipse(
          obstacles[i].x,
          obstacles[i].y,
          obstacles[i].diameter,
          obstacles[i].diameter
        );
      }
    }

    DrawStepsChallenge();
  }
}

function Player() {
  //this.init_x = 50;
  //this.init_y = 200;
  this.init_x = 50;
  this.init_y = (windowHeight * 2) / 3;

  this.angle = 0;

  this.x = this.init_x;
  this.y = this.init_y;

  //this.diameter = 30;
  this.diameter = 45;
  this.steps = this.diameter;
  this.color = color(0, 255, 0);
  this.total_hor_dist_walk = this.diameter * 1;
  this.total_hor_dist_jump = this.diameter * 2;
  this.move = function () {
    var initial_x = this.x;
    var total_hor_dist = this.total_hor_dist_walk;

    var drawStep = function (x) {
      //console.log(x);
      that.x = initial_x + (x * total_hor_dist) / frames;
      redraw();

      if (x == frames) {
        //console.log("FRAMES: "+ x);
      }

      CheckInvalidStates();
    };

    for (var i = 1; i < frames + 1; i++) {
      var that = this;
      animationsArray.push(
        setTimeout(drawStep, animationSpeed * animationCounter, i)
      );
      animationCounter++;
      //animationsArray.push(setTimeout(drawStep, animationSpeed*universalAnimationCounter, i));
      //universalAnimationCounter++;

      //Increate counter to delay next animation
      //if(i == frames){
      //  universalAnimationCounter += 10;
      //}
    }

    //Set the final values for other animations to use
    this.x = initial_x + total_hor_dist;
    animationCounter = 0;
  };

  this.jump = function () {
    var amplitude = this.y * 2;
    var initial_x = this.x;
    var initial_y = this.y;
    var total_hor_dist = this.total_hor_dist_jump;
    var max_height = this.diameter;
    var drawStep = function (j) {
      console.log("Player X: " + player.x + " Y: " + player.y);

      that.x = initial_x + (j * total_hor_dist) / frames;
      that.y = initial_y - max_height * sin((j * PI) / frames); //Use negative to account for inverted coordinate system in Y
      redraw();

      CheckInvalidStates();
    };

    for (var i = 1; i < frames + 1; i++) {
      var that = this;
      animationsArray.push(
        setTimeout(drawStep, animationSpeed * animationCounter, i)
      );
      animationCounter++;
      //animationsArray.push(setTimeout(drawStep, animationSpeed*universalAnimationCounter, i));
      //universalAnimationCounter++;
    }

    //Set the final values for other animations to use
    //this.x = initial_x+total_hor_dist;
    //this.y = initial_y;
    animationCounter = 0;
  };

  this.long_jump = function () {
    var amplitude = this.y * 2;
    var initial_x = this.x;
    var initial_y = this.y;
    var total_hor_dist = this.total_hor_dist_jump * 1.5;
    var max_height = this.diameter;
    var drawStep = function (j) {
      console.log("Player X: " + player.x + " Y: " + player.y);

      that.x = initial_x + (j * total_hor_dist) / frames;
      that.y = initial_y - max_height * sin((j * PI) / frames); //Use negative to account for inverted coordinate system in Y
      redraw();

      CheckInvalidStates();
    };

    for (var i = 1; i < frames + 1; i++) {
      var that = this;
      animationsArray.push(
        setTimeout(drawStep, animationSpeed * animationCounter, i)
      );
      animationCounter++;
      //animationsArray.push(setTimeout(drawStep, animationSpeed*universalAnimationCounter, i));
      //universalAnimationCounter++;
    }

    //Set the final values for other animations to use
    //this.x = initial_x+total_hor_dist;
    //this.y = initial_y;
    animationCounter = 0;
  };

  this.super_jump = function () {
    var amplitude = this.y * 2.5;
    var initial_x = this.x;
    var initial_y = this.y;
    var total_hor_dist = this.total_hor_dist_jump;
    var max_height = this.diameter;
    var drawStep = function (j) {
      console.log("Player X: " + player.x + " Y: " + player.y);

      that.x = initial_x + (j * total_hor_dist) / frames;
      that.y = initial_y - max_height * sin((j * PI) / frames) * 2.5; //Use negative to account for inverted coordinate system in Y
      redraw();

      CheckInvalidStates();
    };

    for (var i = 1; i < frames + 1; i++) {
      var that = this;
      animationsArray.push(
        setTimeout(drawStep, animationSpeed * animationCounter, i)
      );
      animationCounter++;
      //animationsArray.push(setTimeout(drawStep, animationSpeed*universalAnimationCounter, i));
      //universalAnimationCounter++;
    }

    //Set the final values for other animations to use
    //this.x = initial_x+total_hor_dist;
    //this.y = initial_y;
    animationCounter = 0;
  };

  this.display = function () {
    var that = this;
    //Displays the image

    //image(playerImg, that.x-that.diameter/2, that.y-that.diameter/2, that.diameter, that.diameter);
    //fill(this.color);
    //ellipse(this.x, this.y, this.diameter, this.diameter);

    push();
    translate(that.x, that.y);
    rotate(radians(0));
    if (currentLevel <= 20) {
      image(
        playerImg,
        -that.diameter / 2,
        -that.diameter / 2,
        that.diameter,
        that.diameter
      );
    } else {
      image(
        playerImg2,
        -that.diameter / 2,
        -that.diameter / 2,
        that.diameter,
        that.diameter
      );
    }
    pop();
  };
}

function PlayerChallenge() {
  //this.init_x = 50;
  //this.init_y = 200;
  this.init_x = 100;
  this.init_y = windowHeight / 2;

  this.angle = 0;

  this.x = this.init_x;
  this.y = this.init_y;

  this.diameter = 60;
  this.steps = this.diameter;
  this.color = color(0, 255, 0);
  this.total_hor_dist_walk = this.diameter * 1;
  this.total_hor_dist_jump = this.diameter * 2;
  this.move = function () {
    var initial_x = this.x;
    var total_hor_dist = this.total_hor_dist_walk;

    var drawStep = function (x) {
      //console.log(x);
      that.x = initial_x + (x * total_hor_dist) / frames;
      redraw();

      if (x == frames) {
        //console.log("FRAMES: "+ x);
      }

      CheckInvalidStates();
    };

    for (var i = 1; i < frames + 1; i++) {
      var that = this;
      animationsArray.push(
        setTimeout(drawStep, animationSpeed * animationCounter, i)
      );
      animationCounter++;
      //animationsArray.push(setTimeout(drawStep, animationSpeed*universalAnimationCounter, i));
      //universalAnimationCounter++;

      //Increate counter to delay next animation
      //if(i == frames){
      //  universalAnimationCounter += 10;
      //}
    }

    //Set the final values for other animations to use
    this.x = initial_x + total_hor_dist;
    animationCounter = 0;
  };

  this.forward = function () {
    var initial_x = this.x;
    var initial_y = this.y;
    var total_hor_dist = this.total_hor_dist_walk;

    var drawStep = function (x) {
      console.log("ANGLE: " + that.angle);

      if (that.angle == 0 || that.angle == 360) {
        if (initial_x + total_hor_dist)
          that.x = initial_x + (x * total_hor_dist) / frames;
        redraw();
      } else if (that.angle == 90) {
        that.y = initial_y + (x * total_hor_dist) / frames;
        redraw();
      } else if (that.angle == 180) {
        that.x = initial_x - (x * total_hor_dist) / frames;
        redraw();
      } else if (that.angle == 270) {
        that.y = initial_y - (x * total_hor_dist) / frames;
        redraw();
      }

      if (x == frames) {
        //console.log("FRAMES: "+ x);
      }

      CheckInvalidStates();
    };

    for (var i = 1; i < frames + 1; i++) {
      var that = this;
      animationsArray.push(
        setTimeout(drawStep, animationSpeed * animationCounter, i)
      );
      animationCounter++;
      //animationsArray.push(setTimeout(drawStep, animationSpeed*universalAnimationCounter, i));
      //universalAnimationCounter++;

      //Increate counter to delay next animation
      //if(i == frames){
      //  universalAnimationCounter += 10;
      //}
    }

    //Set the final values for other animations to use
    if (that.angle == 0 || that.angle == 360) {
      this.x = initial_x + total_hor_dist;
    } else if (that.angle == 90) {
      this.y = initial_y + total_hor_dist;
    } else if (that.angle == 180) {
      this.x = initial_x - total_hor_dist;
    } else if (that.angle == 270) {
      this.y = initial_y - total_hor_dist;
    }

    animationCounter = 0;
  };

  this.turnRight = function () {
    this.angle += 90;

    if (this.angle == 360) {
      this.angle = 0;
    }

    redraw();
  };

  this.turnLeft = function () {
    this.angle -= 90;

    if (this.angle == -90) {
      this.angle = 270;
    }

    redraw();
  };

  this.jump = function () {
    var amplitude = this.y * 2;
    var initial_x = this.x;
    var initial_y = this.y;
    var total_hor_dist = this.total_hor_dist_jump;
    var max_height = this.diameter;
    var drawStep = function (j) {
      console.log("Player X: " + player.x + " Y: " + player.y);

      that.x = initial_x + (j * total_hor_dist) / frames;
      that.y = initial_y - max_height * sin((j * PI) / frames); //Use negative to account for inverted coordinate system in Y
      redraw();

      CheckInvalidStates();
    };

    for (var i = 1; i < frames + 1; i++) {
      var that = this;
      animationsArray.push(
        setTimeout(drawStep, animationSpeed * animationCounter, i)
      );
      animationCounter++;
      //animationsArray.push(setTimeout(drawStep, animationSpeed*universalAnimationCounter, i));
      //universalAnimationCounter++;
    }

    //Set the final values for other animations to use
    //this.x = initial_x+total_hor_dist;
    //this.y = initial_y;
    animationCounter = 0;
  };

  this.display = function () {
    var that = this;
    //Displays the image

    //image(playerImg, that.x-that.diameter/2, that.y-that.diameter/2, that.diameter, that.diameter);
    //fill(this.color);
    //ellipse(this.x, this.y, this.diameter, this.diameter);

    push();
    translate(that.x, that.y);
    rotate(radians(this.angle));
    if (currentLevel <= 20) {
      image(
        playerImg,
        -that.diameter / 2,
        -that.diameter / 2,
        that.diameter,
        that.diameter
      );
    } else {
      image(
        playerImg3,
        -that.diameter / 2,
        -that.diameter / 2,
        that.diameter,
        that.diameter
      );
    }
    pop();
  };
}

function DrawStepsChallenge() {
  //var steps = (target.x - player.init_x)/player.diameter;
  //var steps = numSteps;
  var X1 = player.init_x - player.diameter / 2;
  var Y1 = player.init_y - player.diameter / 2;
  var width = player.diameter;
  var height = player.diameter;

  emptyCells = [
    new EmptyCell(X1 + width * 2, Y1 - height * 2, width, height),
    new EmptyCell(X1 + width * 6, Y1 - height * 2, width, height),

    new EmptyCell(X1 + width * 2, Y1 - height * 1, width, height),
    new EmptyCell(X1 + width * 6, Y1 - height * 1, width, height),

    new EmptyCell(X1, Y1, width, height),
    new EmptyCell(X1 + width * 1, Y1, width, height),
    new EmptyCell(X1 + width * 2, Y1, width, height),
    new EmptyCell(X1 + width * 3, Y1, width, height),
    new EmptyCell(X1 + width * 4, Y1, width, height),
    new EmptyCell(X1 + width * 5, Y1, width, height),
    new EmptyCell(X1 + width * 6, Y1, width, height),

    new EmptyCell(X1 + width * 2, Y1 + height * 1, width, height),
    new EmptyCell(X1 + width * 6, Y1 + height * 1, width, height),

    new EmptyCell(X1, Y1 + height * 2, width, height),
    new EmptyCell(X1 + width * 1, Y1 + height * 2, width, height),
    new EmptyCell(X1 + width * 2, Y1 + height * 2, width, height),
    new EmptyCell(X1 + width * 5, Y1 + height * 2, width, height),
    new EmptyCell(X1 + width * 6, Y1 + height * 2, width, height),

    new EmptyCell(X1 + width * 2, Y1 + height * 3, width, height),
    new EmptyCell(X1 + width * 3, Y1 + height * 3, width, height),
    new EmptyCell(X1 + width * 4, Y1 + height * 3, width, height),
    new EmptyCell(X1 + width * 5, Y1 + height * 3, width, height),
  ];

  stroke(255, 255, 255);
  noFill();
  for (var i = 0; i < emptyCells.length; i++) {
    //  var x_translate = i*player.diameter;
    console.log("Drawing empty cells");
    rect(
      emptyCells[i].x,
      emptyCells[i].y,
      emptyCells[i].width,
      emptyCells[i].height
    );
  }
  noStroke();
}

function EmptyCell(x, y, width, height) {
  //Used for challenge task
  this.x = x;
  this.y = y;
  this.width = width;
  this.height = height;
}

function Target() {
  this.init_x = 50;
  this.init_y = 200;

  this.x = this.init_x;
  this.y = this.init_y;

  this.diameter = 30;
  this.steps = this.diameter;
  this.color = color(255, 0, 0);

  this.display = function () {
    fill(this.color);
    ellipse(this.x, this.y, this.diameter, this.diameter);
  };
}

function Obstacle(x, y) {
  this.init_x = x;
  this.init_y = y;

  this.x = this.init_x;
  this.y = this.init_y;

  this.diameter = 15;
  if (currentLevel <= 20) {
    this.color = color(125, 38, 205);
  } else {
    this.color = color(205, 125, 38);
  }

  this.display = function () {
    fill(this.color);
    if (currentLevel <= 20) {
      ellipse(this.x, this.y, this.diameter, this.diameter);
    } else {
      rect(
        this.x - this.diameter / 2,
        this.y - this.diameter / 2,
        this.diameter,
        this.diameter
      );
    }
  };
}

function ObstacleChallenge(x, y, fill) {
  this.init_x = x;
  this.init_y = y;
  this.fill = fill;

  this.x = this.init_x;
  this.y = this.init_y;

  this.diameter = 15;
  if (currentLevel <= 20) {
    this.color = color(125, 38, 205);
  } else {
    this.color = color(205, 125, 38);
  }

  this.display = function () {
    fill(this.color);
    if (currentLevel <= 20) {
      ellipse(this.x, this.y, this.diameter, this.diameter);
    } else {
      rect(
        this.x - this.diameter / 2,
        this.y - this.diameter / 2,
        this.diameter,
        this.diameter
      );
    }
  };
}

function DrawSteps() {
  //var steps = (target.x - player.init_x)/player.diameter;
  console.log(numSteps);
  var steps = numSteps;
  var Y1 = player.init_y + player.diameter / 2 + 5;
  var Y2 = Y1;
  var X1 = player.init_x - player.diameter / 4;
  var X2 = X1 + player.diameter / 2;

  stroke(255, 255, 255);
  for (var i = 0; i < steps + 1; i++) {
    var x_translate = i * player.diameter;
    console.log("Drawing steps");
    line(X1 + x_translate, Y1, X2 + x_translate, Y1);
  }
  noStroke();
}

function LoadNextLevel() {
  //Unlock next level in menu
  $(".levelSelectMenu #level" + (currentLevel + 1))[0].disabled = false;
  LoadLevel(currentLevel + 1);
}

function UnlockLevels(maxLevel) {
  var buttons = $(".levelSelectMenu button");
  for (var i = 0; i < maxLevel; i++) {
    console.log(maxLevel);
    buttons[i].disabled = false;
  }
  //if(CURRENT_USER){
  //  var Levels = Parse.Object.extend("Levels");
  //  var query = new Parse.Query(Levels);
  //  query.equalTo("UserId", CURRENT_USER.id);
  //  query.first({
  //    success: function(object) {
  //      if(typeof object !== "undefined") {
  //        maxLevel = object.get("MaxLevel");
  //        CURRENT_USER.maxLevel = Math.max(currentLevel + 1, CURRENT_USER.maxLevel);
  //
  //        console.log(object.get("MaxLevel"));
  //        object.set("MaxLevel", CURRENT_USER.maxLevel);
  //        object.save();
  //        //CURRENT_USER.save();
  //      }else{
  //        var levels = new Parse.Object("Levels");
  //        levels.set("UserId", Parse.User.current().id);
  //        levels.set("MaxLevel", CURRENT_USER.maxLevel);
  //        levels.save();
  //      }
  //    },
  //    error: function(error) {
  //      alert("Error: " + error.code + " " + error.message);
  //    }
  //  });
  //}
}

function ReloadLevel() {
  while (animationsArray.length > 0) {
    clearTimeout(animationsArray.pop());
  }

  LoadLevel(currentLevel);
}

function LoadLevel(level) {
  animationsArray = [];
  invalidState = false;
  Blockly.mainWorkspace.clear();

  currentLevel = 0;
  //Resize toolbox for challenge level
  //if(level == 99){
  //  $("iframe").addClass("challengeIframe");
  //  $("iframe").removeClass("zoomOut");
  //  $("iframe").css({
  //    position: 'relative',
  //    top: '-50px'
  //  });
  //  $("#currentLevel").css({
  //    position: 'relative',
  //    top: '-50px'
  //  });
  //  $("#topMenuText").css({
  //    position: 'relative',
  //    top: '-50px'
  //  });
  //}else if(level >= 39){
  //  $("iframe").removeClass("challengeIframe");
  //  $("iframe").addClass("zoomOut");
  //  $("iframe").css({
  //    position: 'relative',
  //    top: '-50px'
  //  });
  //  $("#currentLevel").css({
  //    position: 'relative',
  //    top: '-50px'
  //  });
  //  $("#topMenuText").css({
  //    position: 'relative',
  //    top: '-50px'
  //  });
  //}else{
  //  $("iframe").removeClass("challengeIframe");
  //  $("iframe").removeClass("zoomOut");
  //  $("iframe").css({
  //    position: 'static'
  //  });
  //  $("#currentLevel").css({
  //    position: 'static'
  //  });
  //  $("#topMenuText").css({
  //    position: 'static'
  //  });
  //}

  if (currentLevel != level) {
    //$("#instructionsModal").modal({
    //  backdrop: 'static',
    //  show: true
    //});
    //currentLevel = level;

    console.log("Start level");
    console.log(currentLevel);
    // if (!$.isEmptyObject(CURRENT_USER)) {
    //     var StartLevel = Parse.Object.extend("StartLevel");
    //     var startLevel = new StartLevel();
    //     startLevel.set("level", level);
    //     startLevel.set("UserId", CURRENT_USER.id);
    //     startLevel.save();
    // }
  }

  eval("LoadLevel" + level + "();");

  if (currentLevel <= 20) {
    $("div#currentLevel").html(currentLevel);
  } else if (currentLevel <= 43) {
    $("div#currentLevel").html(currentLevel - 20);
  } else {
    $("div#currentLevel").html("*");
  }

  //Close menu on level load
  $("ul#menuButtons").slideUp();
  menuButtonsOpen = false;
  $topMenuText.text("");
}

function LoadLevel1() {
  if (currentLevel != 1) {
    $("#instructionsModal .modal-body").html(
      '<h3>Connect the "Walk" block to the "On Start" block. Then press the Start button to execute.</h3>'
    );
    $("#instructionsModal").modal("show");
    currentLevel = 1;
    tipToShow = 1;
    totalNumTips = 2;
    numSteps = 1;
  }

  player = new Player();
  //player.init_x = 100;
  //player.init_y = 200;

  player.x = player.init_x;
  player.y = player.init_y;

  target = new Target();
  target.y = player.y + player.diameter * 0;
  target.x = player.x + player.diameter * 1; //Position target one steps away from player
  target.color = color(153, 51, 0);

  obstacles = [];

  Blockly.updateToolbox(
    '<xml id="toolbox" style="display: none">' +
      "<block " +
      // 'movable="false" ' +
      // 'deletable="false" ' +
      'type="walk">' +
      "</block>" +
      //'<block type="start"></block>'+
      //'<block type="jump"></block>'+
      //'<block type="controls_whileUntil">'+
      //  '<field name="MODE">UNTIL</field>'+
      //'</block>'+
      //'<block type="empty"></block>'+
      //'<block type="text_print"></block>'+
      //'<block type="text"></block>'+
      //'<block type="controls_if"></block>'+
      //'<block type="logic_compare"></block>'+
      //'<block type="logic_operation"></block>'+
      //'<block type="logic_negate"></block>'+
      //'<block type="logic_boolean"></block>'+
      //'<block type="math_number"></block>'+
      "</xml>"
  );

  $("#tipModal1 .modal-body").html(
    '<h3>You need to connect the "Walk" block to the "On Start" block to make the cat walk.</h3>'
  );

  $("#tipModal2 .modal-body").html(
    '<h3>You need to program the cat to walk towards the red circle. Connect the visual blocks in the right way to make the cat walk. Try using the "Walk" block.</h3>' +
      '<div class="row">' +
      '<div class="col-xs-3">' +
      '<img src="../images/start.png">' +
      "</div>" +
      '<div class="col-xs-9">' +
      "<h3>This is the first block of your program. Add blocks under this one.</h3>" +
      "</div>" +
      "</div>" +
      '<div class="row">' +
      '<div class="col-xs-3">' +
      '<img src="../images/walk.png">' +
      "</div>" +
      '<div class="col-xs-9">' +
      "<h3>Each Walk block moves the cat one space to the right.</h3>" +
      "</div>" +
      "</div>"
  );

  $("button#newBlockTip").hide();

  //Insert Start block in workspace
  InsertBlock("start", 150, 50, false, true);

  redraw();
}

function LoadLevel2() {
  if (currentLevel != 2) {
    $("#instructionsModal .modal-body").html(
      "<h3>Program the cat to walk to the red circle</h3>"
    );
    $("#instructionsModal").modal("show");
    currentLevel = 2;
    tipToShow = 1;
    totalNumTips = 3;
    numSteps = 2;
  }

  player = new Player();
  //player.init_x = 50;
  //player.init_y = 200;

  player.x = player.init_x;
  player.y = player.init_y;

  target = new Target();
  target.y = player.y + player.diameter * 0;
  target.x = player.x + player.diameter * 2; //Position target three steps away from player
  target.color = color(153, 51, 0);

  obstacles = [];

  Blockly.updateToolbox(
    '<xml id="toolbox" style="display: none">' +
      '<block type="walk"></block>' +
      "</xml>"
  );

  $("#tipModal1 .modal-body").html(
    '<h3>You need to connect the "Walk" blocks. Try using more than one "Walk" block.</h3>'
  );

  $("#tipModal2 .modal-body").html(
    "<h3>To write the best code, you should solve the problem using 3 or less blocks. If you can't do it the first time, just come back later and try again.</h3>"
  );

  $("#tipModal3 .modal-body").html(
    '<h3>You need to program the cat to reach the red circle. Connect the visual blocks in the right way to get the cat moving. Try using more than one "Walk" block.</h3>' +
      '<div class="row">' +
      '<div class="col-xs-3">' +
      '<img src="../images/start.png">' +
      "</div>" +
      '<div class="col-xs-9">' +
      "<h3>This is the first block of your program. Add blocks under this one.</h3>" +
      "</div>" +
      "</div>" +
      '<div class="row">' +
      '<div class="col-xs-3">' +
      '<img src="../images/walk.png">' +
      "</div>" +
      '<div class="col-xs-9">' +
      "<h3>Each Walk block moves the cat one space to the right.</h3>" +
      "</div>" +
      "</div>"
  );

  $("button#newBlockTip").hide();

  //Insert Start block in workspace
  InsertBlock("start", 150, 50, false, true);

  redraw();
}

function LoadLevel3() {
  if (currentLevel != 3) {
    $("#instructionsModal .modal-body").html(
      "<h3>Program the cat to walk to the red circle.</h3>"
    );
    $("#instructionsModal").modal("show");
    currentLevel = 3;
    tipToShow = 1;
    totalNumTips = 3;
    numSteps = 4;
  }

  player = new Player();
  //player.init_x = 50;
  //player.init_y = 200;

  player.x = player.init_x;
  player.y = player.init_y;

  target = new Target();
  target.y = player.y + player.diameter * 0;
  target.x = player.x + player.diameter * 4; //Position target three steps away from player
  target.color = color(153, 51, 0);

  obstacles = [];
  Blockly.updateToolbox(
    '<xml id="toolbox" style="display: none">' +
      '<block type="walk"></block>' +
      "</xml>"
  );

  $("#tipModal1 .modal-body").html(
    '<h3>Try connecting more than one "Walk" block to reach the red circle.</h3>'
  );

  $("#tipModal2 .modal-body").html(
    "<h3>To write the best code, you should solve the problem using 5 or less blocks. If you can't do it the first time, just come back later and try again.</h3>"
  );

  $("#tipModal3 .modal-body").html(
    '<h3>You need to program the cat to reach the red circle. Connect the visual blocks in the right way to get the cat moving. Try using many "Walk" blocks. </h3>' +
      '<div class="row">' +
      '<div class="col-xs-3">' +
      '<img src="../images/start.png">' +
      "</div>" +
      '<div class="col-xs-9">' +
      "<h3>This is the first block of your program. Add blocks under this one.</h3>" +
      "</div>" +
      "</div>" +
      '<div class="row">' +
      '<div class="col-xs-3">' +
      '<img src="../images/walk.png">' +
      "</div>" +
      '<div class="col-xs-9">' +
      "<h3>Each Walk block moves the cat one space to the right.</h3>" +
      "</div>" +
      "</div>"
  );

  $("button#newBlockTip").hide();

  //Insert Start block in workspace
  InsertBlock("start", 150, 50, false, true);

  redraw();
}

function LoadLevel4() {
  if (currentLevel != 4) {
    $("#instructionsModal .modal-body").html(
      '<h3>Use "Jump" to avoid the purple circles and reach the red circle.</h3>'
    ); //.append('<svg width="20" height="20"><circle cx="10" cy="10" r="10" fill="purple" /></svg>');
    $("#instructionsModal").modal("show");
    currentLevel = 4;
    tipToShow = 1;
    totalNumTips = 3;
    numSteps = 5;
  }

  player = new Player();
  //player.init_x = 50;
  //player.init_y = 200;

  player.x = player.init_x;
  player.y = player.init_y;

  target = new Target();
  target.y = player.y + player.diameter * 0;
  target.x = player.x + player.diameter * 5; //Position target three steps away from player
  target.color = color(153, 51, 0);

  obstacles = [new Obstacle(player.x + player.diameter * 3, player.y)];
  Blockly.updateToolbox(
    '<xml id="toolbox" style="display: none">' +
      '<block type="walk"></block>' +
      //'<block type="repeat_until"></block>'+
      //'<block type="controls_if"></block>'+
      //'<block type="obstacle"></block>'+
      //'<block type="target"></block>'+
      '<block type="jump"></block>' +
      "</xml>"
  );

  $("#tipModal1 .modal-body").html(
    '<h3>Try using the "Walk" and "Jump" block to walk and jump over the purple circles.</h3>'
  );
  //<svg width="20" height="20"><circle cx="10" cy="10" r="10" fill="purple" /></svg>

  $("#tipModal2 .modal-body").html(
    "<h3>To write the best code, you should solve the problem using 5 or less blocks. If you can't do it the first time, just come back later and try again.</h3>"
  );

  $("#tipModal3 .modal-body").html(
    '<h3>Connect the visual blocks in the right way to get the cat moving. Try using many "Walk" and "Jump" blocks.</h3>' +
      '<div class="row">' +
      '<div class="col-xs-3">' +
      '<img src="../images/start.png">' +
      "</div>" +
      '<div class="col-xs-9">' +
      "<h3>This is the first block of your program. Add blocks under this one.</h3>" +
      "</div>" +
      "</div>" +
      '<div class="row">' +
      '<div class="col-xs-3">' +
      '<img src="../images/walk.png">' +
      "</div>" +
      '<div class="col-xs-9">' +
      "<h3>Each Walk block moves the cat one space to the right.</h3>" +
      "</div>" +
      "</div>" +
      '<div class="row">' +
      '<div class="col-xs-3">' +
      '<img src="../images/jump.png">' +
      "</div>" +
      '<div class="col-xs-9">' +
      "<h3>Each Jump block makes the cat move over purple circles and moves him a total of two spaces.</h3>" +
      "</div>" +
      "</div>"
  );

  $("button#newBlockTip").show();
  $("#newBlockModal .modal-body").html(
    '<div class="row">' +
      '<div class="col-xs-3">' +
      '<img src="../images/jump.png">' +
      "</div>" +
      '<div class="col-xs-9">' +
      '<h3>Each "Jump" block makes the cat jump over purple circle and move two spaces over.</h3>' +
      "</div>" +
      "</div>"
  );

  //Insert Start block in workspace
  InsertBlock("start", 150, 50, false, true);

  redraw();
}

function LoadLevel5() {
  if (currentLevel != 5) {
    $("#instructionsModal .modal-body").html(
      "<h3>Use the repeat block to reach the red circle</h3>"
    );
    $("#instructionsModal").modal("show");
    currentLevel = 5;
    tipToShow = 1;
    totalNumTips = 2;
    numSteps = 9;
  }

  player = new Player();
  //player.init_x = 50;
  //player.init_y = 200;

  player.x = player.init_x;
  player.y = player.init_y;

  target = new Target();
  target.y = player.y + player.diameter * 0;
  target.x = player.x + player.diameter * 9; //Position target three steps away from player
  target.color = color(153, 51, 0);

  obstacles = [];

  Blockly.updateToolbox(
    '<xml id="toolbox" style="display: none">' +
      '<block type="controls_repeat">' +
      '<field name="TIMES">9</field>' +
      "</block>" +
      '<block type="walk"></block>' +
      //'<block type="repeat_until"></block>'+
      //'<block type="target"></block>'+
      "</xml>"
  );

  $("#tipModal1 .modal-body").html(
    "<h3>To write the best code, you should solve the problem using 3 or less blocks. If you can't do it the first time, just come back later and try again.</h3>"
  );
  $("#tipModal2 .modal-body").html(
    '<h4>Try using the "Repeat" block with a "Walk" block inside. Change the number to change the number of times to repeat.</h4>' +
      '<h4>Connect the visual blocks in the right way to get the cat moving. Try using the "Repeat" and "Walk" blocks.</h4>' +
      '<div class="row">' +
      '<div class="col-xs-5">' +
      '<img src="../images/repeat9.png">' +
      "</div>" +
      '<div class="col-xs-7">' +
      '<h4>Repeats the blocks in this "Repeat" block 9 times. The "Repeat" block is useful when you want to run the same code again and again. You can connect the "Walk" and "Jump" blocks inside it. You can also change the number of times you want to repeat the code.</h4>' +
      "</div>" +
      "</div>" +
      '<div class="row">' +
      '<div class="col-xs-5">' +
      '<img src="../images/walk.png">' +
      "</div>" +
      '<div class="col-xs-7">' +
      "<h4>Each Walk block moves the cat one space to the right.</h4>" +
      "</div>" +
      "</div>"
  );

  $("button#newBlockTip").show();
  $("#newBlockModal .modal-body").html(
    '<div class="row">' +
      '<div class="col-xs-5">' +
      '<img src="../images/repeat9.png">' +
      "</div>" +
      '<div class="col-xs-7">' +
      '<h3>The "Repeat" block makes the cat repeat whatever blocks are connected inside of it.</h3>' +
      "</div>" +
      "</div>"
  );

  //Insert Start block in workspace
  InsertBlock("start", 150, 50, false, true);

  redraw();
}

function LoadLevel6() {
  if (currentLevel != 6) {
    $("#instructionsModal .modal-body").html(
      "<h3>Avoid the purple circles to reach the red circle.</h3>"
    );
    $("#instructionsModal").modal("show");
    currentLevel = 6;
    tipToShow = 1;
    totalNumTips = 3;
    numSteps = 9;

    Blockly.updateToolbox(
      '<xml id="toolbox" style="display: none">' +
        //'<block type="repeat_until"></block>'+
        '<block type="controls_repeat">' +
        '<field name="TIMES">3</field>' +
        "</block>" +
        '<block type="walk"></block>' +
        '<block type="jump"></block>' +
        "</xml>"
    );
  }

  player = new Player();
  //player.init_x = 50;
  //player.init_y = 200;

  player.x = player.init_x;
  player.y = player.init_y;

  target = new Target();
  target.y = player.y + player.diameter * 0;
  target.x = player.x + player.diameter * 9; //Position target three steps away from player
  target.color = color(153, 51, 0);

  obstacles = [
    new Obstacle(player.x + player.diameter * 2, player.y),
    new Obstacle(player.x + player.diameter * 5, player.y),
    new Obstacle(player.x + player.diameter * 8, player.y),
  ];

  $("#tipModal1 .modal-body").html(
    "<h3>To write the best code, you should solve the problem using 4 or less blocks. If you can't do it the first time, just come back later and try again.</h3>"
  );

  $("#tipModal2 .modal-body").html(
    '<h3>Try using the "Repeat" block with "Walk" and "Jump" blocks inside.</h3>'
  );

  $("#tipModal3 .modal-body").html(
    '<h4>Connect the visual blocks in the right way to get the cat moving. Try using the "Walk" and "Jump" blocks inside the "Repeat" blocks.</h4>' +
      '<div class="row">' +
      '<div class="col-xs-5">' +
      '<img src="../images/repeat3.png">' +
      "</div>" +
      '<div class="col-xs-7">' +
      '<h4>Repeats the blocks in this "Repeat" block 3 times. The "Repeat" block is useful when you want to run the same code again and again. You can connect the "Walk" and "Jump" blocks inside it. You can also change the number of times you want to repeat the code.</h4>' +
      "</div>" +
      "</div>" +
      '<div class="row">' +
      '<div class="col-xs-5">' +
      '<img src="../images/walk.png">' +
      "</div>" +
      '<div class="col-xs-7">' +
      "<h4>Each Walk block moves the cat one space to the right.</h4>" +
      "</div>" +
      "</div>" +
      '<div class="row">' +
      '<div class="col-xs-5">' +
      '<img src="../images/jump.png">' +
      "</div>" +
      '<div class="col-xs-7">' +
      "<h4>Each Jump block makes the cat move over purple circles and moves him a total of two spaces.</h4>" +
      "</div>" +
      "</div>"
  );

  $("button#newBlockTip").hide();

  //Insert Start block in workspace
  InsertBlock("start", 150, 50, false, true);

  redraw();
}

function LoadLevel7() {
  if (currentLevel != 7) {
    $("#instructionsModal .modal-body").html(
      "<h3>Avoid the obstacles to get to the red circle.</h3>"
    );
    $("#instructionsModal").modal("show");
    currentLevel = 7;
    tipToShow = 1;
    totalNumTips = 3;
    numSteps = 9;

    Blockly.updateToolbox(
      '<xml id="toolbox" style="display: none">' +
        //'<block type="repeat_until"></block>'+
        '<block type="controls_repeat">' +
        '<field name="TIMES">3</field>' +
        "</block>" +
        '<block type="walk"></block>' +
        '<block type="jump"></block>' +
        "</xml>"
    );
  }

  player = new Player();
  //player.init_x = 50;
  //player.init_y = 200;

  player.x = player.init_x;
  player.y = player.init_y;

  target = new Target();
  target.y = player.y + player.diameter * 0;
  target.x = player.x + player.diameter * 9; //Position target three steps away from player
  target.color = color(153, 51, 0);

  obstacles = [
    new Obstacle(player.x + player.diameter * 1, player.y),
    new Obstacle(player.x + player.diameter * 4, player.y),
    new Obstacle(player.x + player.diameter * 7, player.y),
  ];

  $("#tipModal1 .modal-body").html(
    "<h3>To write the best code, you should solve the problem using 4 or less blocks. If you can't do it the first time, just come back later and try again.</h3>"
  );

  $("#tipModal2 .modal-body").html(
    '<h3>Try using the "Repeat" block with "Walk" and "Jump" blocks inside.</h3>'
  );

  $("#tipModal3 .modal-body").html(
    '<h4>Connect the visual blocks in the right way to get the cat moving. Try using the "Walk" and "Jump" blocks.</h4>' +
      '<div class="row">' +
      '<div class="col-xs-5">' +
      '<img src="../images/repeat3.png">' +
      "</div>" +
      '<div class="col-xs-7">' +
      '<h4>Repeats the blocks in this "Repeat" block 3 times. The "Repeat" block is useful when you want to run the same code again and again. You can connect the "Walk" and "Jump" blocks inside it. You can also change the number of times you want to repeat the code.</h4>' +
      "</div>" +
      "</div>" +
      '<div class="row">' +
      '<div class="col-xs-5">' +
      '<img src="../images/walk.png">' +
      "</div>" +
      '<div class="col-xs-7">' +
      "<h4>Each Walk block moves the cat one space to the right.</h4>" +
      "</div>" +
      "</div>" +
      '<div class="row">' +
      '<div class="col-xs-5">' +
      '<img src="../images/jump.png">' +
      "</div>" +
      '<div class="col-xs-7">' +
      "<h4>Each Jump block makes the cat move over purple circles and moves him a total of two spaces.</h4>" +
      "</div>" +
      "</div>"
  );

  $("button#newBlockTip").hide();

  //Insert Start block in workspace
  InsertBlock("start", 150, 50, false, true);

  redraw();
}

function LoadLevel8() {
  if (currentLevel != 8) {
    $("#instructionsModal .modal-body").html(
      "<h3>Avoid the obstacles to get to the red circle.</h3>"
    );
    $("#instructionsModal").modal("show");
    currentLevel = 8;
    tipToShow = 1;
    totalNumTips = 3;
    numSteps = 7;

    Blockly.updateToolbox(
      '<xml id="toolbox" style="display: none">' +
        //'<block type="repeat_until"></block>'+
        '<block type="controls_repeat">' +
        '<field name="TIMES">2</field>' +
        "</block>" +
        '<block type="walk"></block>' +
        '<block type="jump"></block>' +
        "</xml>"
    );
  }

  player = new Player();
  //player.init_x = 50;
  //player.init_y = 200;

  player.x = player.init_x;
  player.y = player.init_y;

  target = new Target();
  target.y = player.y + player.diameter * 0;
  target.x = player.x + player.diameter * 7; //Position target three steps away from player
  target.color = color(153, 51, 0);

  obstacles = [
    new Obstacle(player.x + player.diameter * 1, player.y),
    new Obstacle(player.x + player.diameter * 4, player.y),
  ];

  $("#tipModal1 .modal-body").html(
    "<h3>To write the best code, you should solve the problem using 5 or less blocks. If you can't do it the first time, just come back later and try again.</h3>"
  );

  $("#tipModal2 .modal-body").html(
    '<h3>You  might need an extra "Walk" block after the "Repeat" block.</h3>'
  );

  $("#tipModal3 .modal-body").html(
    '<h4>Connect the visual blocks in the right way to get the cat moving. Try using many "Walk" and "Jump" blocks.</h4>' +
      '<div class="row">' +
      '<div class="col-xs-5">' +
      '<img src="../images/repeat2.png">' +
      "</div>" +
      '<div class="col-xs-7">' +
      '<h4>Repeats the blocks in this "Repeat" block 2 times. The "Repeat" block is useful when you want to run the same code again and again. You can connect the "Walk" and "Jump" blocks inside it. You can also change the number of times you want to repeat the code.</h4>' +
      "</div>" +
      "</div>" +
      '<div class="row">' +
      '<div class="col-xs-5">' +
      '<img src="../images/walk.png">' +
      "</div>" +
      '<div class="col-xs-7">' +
      "<h4>Each Walk block moves the cat one space to the right.</h4>" +
      "</div>" +
      "</div>" +
      '<div class="row">' +
      '<div class="col-xs-5">' +
      '<img src="../images/jump.png">' +
      "</div>" +
      '<div class="col-xs-7">' +
      "<h4>Each Jump block makes the cat move over purple circles and moves him a total of two spaces.</h4>" +
      "</div>" +
      "</div>"
  );

  $("button#newBlockTip").hide();

  //Insert Start block in workspace
  InsertBlock("start", 150, 50, false, true);

  redraw();
}

function LoadLevel9() {
  if (currentLevel != 9) {
    $("#instructionsModal .modal-body").html(
      "<h3>Avoid the obstacles to get to the red circle.</h3>"
    );
    $("#instructionsModal").modal("show");
    currentLevel = 9;
    tipToShow = 1;
    totalNumTips = 3;
    numSteps = 7;

    Blockly.updateToolbox(
      '<xml id="toolbox" style="display: none">' +
        //'<block type="repeat_until"></block>'+
        '<block type="controls_repeat">' +
        '<field name="TIMES">2</field>' +
        "</block>" +
        '<block type="walk"></block>' +
        '<block type="jump"></block>' +
        "</xml>"
    );
  }

  player = new Player();
  //player.init_x = 50;
  //player.init_y = 200;

  player.x = player.init_x;
  player.y = player.init_y;

  target = new Target();
  target.y = player.y + player.diameter * 0;
  target.x = player.x + player.diameter * 7; //Position target three steps away from player
  target.color = color(153, 51, 0);

  obstacles = [
    new Obstacle(player.x + player.diameter * 3, player.y),
    new Obstacle(player.x + player.diameter * 6, player.y),
  ];

  $("#tipModal1 .modal-body").html(
    "<h3>To write the best code, you should solve the problem using 5 or less blocks. If you can't do it the first time, just come back later and try again.</h3>"
  );

  $("#tipModal2 .modal-body").html(
    '<h3>You  might need an extra "Walk" block before the "Repeat" block.</h3>'
  );

  $("#tipModal3 .modal-body").html(
    '<h4>Connect the visual blocks in the right way to get the cat moving. Try using many "Walk" and "Jump" blocks.</h4>' +
      '<div class="row">' +
      '<div class="col-xs-5">' +
      '<img src="../images/repeat2.png">' +
      "</div>" +
      '<div class="col-xs-7">' +
      '<h4>Repeats the blocks in this "Repeat" block 2 times. The "Repeat" block is useful when you want to run the same code again and again. You can connect the "Walk" and "Jump" blocks inside it. You can also change the number of times you want to repeat the code.</h4>' +
      "</div>" +
      "</div>" +
      '<div class="row">' +
      '<div class="col-xs-5">' +
      '<img src="../images/walk.png">' +
      "</div>" +
      '<div class="col-xs-7">' +
      "<h4>Each Walk block moves the cat one space to the right.</h4>" +
      "</div>" +
      "</div>" +
      '<div class="row">' +
      '<div class="col-xs-5">' +
      '<img src="../images/jump.png">' +
      "</div>" +
      '<div class="col-xs-7">' +
      "<h4>Each Jump block makes the cat move over purple circles and moves him a total of two spaces.</h4>" +
      "</div>" +
      "</div>"
  );

  $("button#newBlockTip").hide();

  //Insert Start block in workspace
  InsertBlock("start", 150, 50, false, true);

  redraw();
}

function LoadLevel10() {
  if (currentLevel != 10) {
    $("#instructionsModal .modal-body").html(
      "<h3>Avoid the obstacles to get to the red circle.</h3>"
    );
    $("#instructionsModal").modal("show");
    currentLevel = 10;
    tipToShow = 1;
    totalNumTips = 4;
    numSteps = 9;

    Blockly.updateToolbox(
      '<xml id="toolbox" style="display: none">' +
        //'<block type="repeat_until"></block>'+
        '<block type="controls_repeat">' +
        '<field name="TIMES">3</field>' +
        "</block>" +
        '<block type="walk"></block>' +
        '<block type="jump"></block>' +
        "</xml>"
    );
  }

  player = new Player();
  //player.init_x = 50;
  //player.init_y = 200;

  player.x = player.init_x;
  player.y = player.init_y;

  target = new Target();
  target.y = player.y + player.diameter * 0;
  target.x = player.x + player.diameter * 8; //Position target three steps away from player
  target.color = color(153, 51, 0);

  obstacles = [new Obstacle(player.x + player.diameter * 4, player.y)];

  $("#tipModal1 .modal-body").html(
    "<h3>To write the best code, you should solve the problem using 6 or less blocks. If you can't do it the first time, just come back later and try again.</h3>"
  );

  $("#tipModal2 .modal-body").html('<h3>Try using 2 "Repeat" blocks.</h3>');

  $("#tipModal3 .modal-body").html(
    '<h3>Try using 2 "Repeat" blocks with a "Jump" block in between.</h3>'
  );

  $("#tipModal4 .modal-body").html(
    '<h4>Connect the visual blocks in the right way to get the cat moving. Try using many "Walk" and "Jump" blocks.</h4>' +
      '<div class="row">' +
      '<div class="col-xs-5">' +
      '<img src="../images/repeat3.png">' +
      "</div>" +
      '<div class="col-xs-7">' +
      '<h4>Repeats the blocks in this "Repeat" block 3 times. The "Repeat" block is useful when you want to run the same code again and again. You can connect the "Walk" and "Jump" blocks inside it. You can also change the number of times you want to repeat the code.</h4>' +
      "</div>" +
      "</div>" +
      '<div class="row">' +
      '<div class="col-xs-5">' +
      '<img src="../images/walk.png">' +
      "</div>" +
      '<div class="col-xs-7">' +
      "<h4>Each Walk block moves the cat one space to the right.</h4>" +
      "</div>" +
      "</div>" +
      '<div class="row">' +
      '<div class="col-xs-5">' +
      '<img src="../images/jump.png">' +
      "</div>" +
      '<div class="col-xs-7">' +
      "<h4>Each Jump block makes the cat move over purple circles and moves him a total of two spaces.</h4>" +
      "</div>" +
      "</div>"
  );

  $("button#newBlockTip").hide();

  //Insert Start block in workspace
  InsertBlock("start", 150, 50, false, true);

  redraw();
}

function LoadLevel11() {
  if (currentLevel != 11) {
    $("#instructionsModal .modal-body").html("<h3>Walk to the red circle.<h3>");
    $("#instructionsModal").modal("show");
    currentLevel = 11;
    tipToShow = 1;
    totalNumTips = 2;
    numSteps = 7;

    controls_whileUntil_options = [["repeat until", "UNTIL"]];
    Blockly.updateToolbox(
      '<xml id="toolbox" style="display: none">' +
        //'<block type="repeat_until"></block>'+
        '<block type="controls_whileUntil">' +
        '<field name="MODE">UNTIL</field>' +
        '<value name="BOOL">' +
        "<block " +
        'movable="false" ' +
        //'deletable="false" ' +
        'type="target">' +
        "</block>" +
        "</value>" +
        "</block>" +
        '<block type="walk"></block>' +
        '<block type="jump"></block>' +
        "</xml>"
    );
  }

  player = new Player();
  //player.init_x = 50;
  //player.init_y = 200;

  player.x = player.init_x;
  player.y = player.init_y;

  target = new Target();
  target.y = player.y + player.diameter * 0;
  target.x = player.x + player.diameter * 7; //Position target three steps away from player
  target.color = color(153, 51, 0);

  obstacles = [];

  $("#tipModal1 .modal-body").html(
    "<h3>To write the best code, you should solve the problem using 3 or less blocks. If you can't do it the first time, just come back later and try again.</h3>"
  );

  $("#tipModal2 .modal-body").html(
    '<h4>Connect the visual blocks in the right way to get the cat moving inside the "repeat until" block.</h4>' +
      '<div class="row">' +
      '<div class="col-xs-5">' +
      '<img src="../images/repeat_until_target.png">' +
      "</div>" +
      '<div class="col-xs-7">' +
      '<h4>Repeat the blocks in this "repeat until" until the cat reaches the red circle. The "repeat until" block is useful when you want to run the same code again and again until the goal is reached. In this case the goal is the red circle. You can connect the "Walk" and "Jump" blocks inside it.</h4>' +
      "</div>" +
      "</div>" +
      '<div class="row">' +
      '<div class="col-xs-5">' +
      '<img src="../images/walk.png">' +
      "</div>" +
      '<div class="col-xs-7">' +
      "<h4>Each Walk block moves the cat one space to the right.</h4>" +
      "</div>" +
      "</div>" +
      '<div class="row">' +
      '<div class="col-xs-5">' +
      '<img src="../images/jump.png">' +
      "</div>" +
      '<div class="col-xs-7">' +
      "<h4>Each Jump block makes the cat move over purple circles and moves him a total of two spaces.</h4>" +
      "</div>" +
      "</div>"
  );

  $("button#newBlockTip").show();
  $("#newBlockModal .modal-body").html(
    '<div class="row">' +
      '<div class="col-xs-5">' +
      '<img src="../images/repeat_until_target.png">' +
      "</div>" +
      '<div class="col-xs-7">' +
      '<h3>Repeat the blocks in this "repeat until" until the cat reaches the red circle.</h3>' +
      "</div>" +
      "</div>"
  );

  //Insert Start block in workspace
  InsertBlock("start", 200, 50, false, true);

  redraw();
}

function LoadLevel12() {
  if (currentLevel != 12) {
    $("#instructionsModal .modal-body").html("<h3>Walk to the red circle.<h3>");
    $("#instructionsModal").modal("show");
    currentLevel = 12;
    tipToShow = 1;
    totalNumTips = 2;
    numSteps = 6;

    controls_whileUntil_options = [["repeat until", "UNTIL"]];
    Blockly.updateToolbox(
      '<xml id="toolbox" style="display: none">' +
        '<block type="controls_whileUntil">' +
        '<field name="MODE">UNTIL</field>' +
        '<value name="BOOL">' +
        "<block " +
        'movable="false" ' +
        //'deletable="false" ' +
        'type="target">' +
        "</block>" +
        "</value>" +
        "</block>" +
        '<block type="walk"></block>' +
        '<block type="jump"></block>' +
        "</xml>"
    );
  }

  player = new Player();
  //player.init_x = 50;
  //player.init_y = 200;

  player.x = player.init_x;
  player.y = player.init_y;

  target = new Target();
  target.y = player.y + player.diameter * 0;
  target.x = player.x + player.diameter * 6; //Position target three steps away from player
  target.color = color(153, 51, 0);

  obstacles = [
    new Obstacle(player.x + player.diameter * 2, player.y),
    new Obstacle(player.x + player.diameter * 5, player.y),
  ];

  $("#tipModal1 .modal-body").html(
    "<h3>To write the best code, you should solve the problem using 4 or less blocks. If you can't do it the first time, just come back later and try again.</h3>"
  );

  $("#tipModal2 .modal-body").html(
    '<h4>Connect the visual blocks in the right way to get the cat moving inside the "repeat until" block.</h4>' +
      '<div class="row">' +
      '<div class="col-xs-5">' +
      '<img src="../images/repeat_until_target.png">' +
      "</div>" +
      '<div class="col-xs-7">' +
      '<h4>Repeat the blocks in this "repeat until" until the cat reaches the red circle. The "repeat until" block is useful when you want to run the same code again and again until the goal is reached. In this case the goal is the red circle. You can connect the "Walk" and "Jump" blocks inside it.</h4>' +
      "</div>" +
      "</div>" +
      '<div class="row">' +
      '<div class="col-xs-5">' +
      '<img src="../images/walk.png">' +
      "</div>" +
      '<div class="col-xs-7">' +
      "<h4>Each Walk block moves the cat one space to the right.</h4>" +
      "</div>" +
      "</div>" +
      '<div class="row">' +
      '<div class="col-xs-5">' +
      '<img src="../images/jump.png">' +
      "</div>" +
      '<div class="col-xs-7">' +
      "<h4>Each Jump block makes the cat move over purple circles and moves him a total of two spaces.</h4>" +
      "</div>" +
      "</div>"
  );

  $("button#newBlockTip").hide();

  //Insert Start block in workspace
  InsertBlock("start", 200, 50, false, true);

  redraw();
}

function LoadLevel13() {
  if (currentLevel != 13) {
    $("#instructionsModal .modal-body").html("<h3>Walk to the red circle.<h3>");
    $("#instructionsModal").modal("show");
    currentLevel = 13;
    tipToShow = 1;
    totalNumTips = 2;
    numSteps = 6;

    controls_whileUntil_options = [["repeat until", "UNTIL"]];
    Blockly.updateToolbox(
      '<xml id="toolbox" style="display: none">' +
        '<block type="controls_whileUntil">' +
        '<field name="MODE">UNTIL</field>' +
        '<value name="BOOL">' +
        "<block " +
        'movable="false" ' +
        //'deletable="false" ' +
        'type="target">' +
        "</block>" +
        "</value>" +
        "</block>" +
        '<block type="walk"></block>' +
        '<block type="jump"></block>' +
        "</xml>"
    );
  }

  player = new Player();
  //player.init_x = 50;
  //player.init_y = 200;

  player.x = player.init_x;
  player.y = player.init_y;

  target = new Target();
  target.y = player.y + player.diameter * 0;
  target.x = player.x + player.diameter * 6; //Position target three steps away from player
  target.color = color(153, 51, 0);

  obstacles = [
    new Obstacle(player.x + player.diameter * 1, player.y),
    new Obstacle(player.x + player.diameter * 4, player.y),
  ];

  $("#tipModal1 .modal-body").html(
    "<h3>To write the best code, you should solve the problem using 4 or less blocks. If you can't do it the first time, just come back later and try again.</h3>"
  );

  $("#tipModal2 .modal-body").html(
    '<h4>Connect the visual blocks in the right way to get the cat moving inside the "repeat until" block.</h4>' +
      '<div class="row">' +
      '<div class="col-xs-5">' +
      '<img src="../images/repeat_until_target.png">' +
      "</div>" +
      '<div class="col-xs-7">' +
      '<h4>Repeat the blocks in this "repeat until" until the cat reaches the red circle. The "repeat until" block is useful when you want to run the same code again and again until the goal is reached. In this case the goal is the red circle. You can connect the "Walk" and "Jump" blocks inside it.</h4>' +
      "</div>" +
      "</div>" +
      '<div class="row">' +
      '<div class="col-xs-5">' +
      '<img src="../images/walk.png">' +
      "</div>" +
      '<div class="col-xs-7">' +
      "<h4>Each Walk block moves the cat one space to the right.</h4>" +
      "</div>" +
      "</div>" +
      '<div class="row">' +
      '<div class="col-xs-5">' +
      '<img src="../images/jump.png">' +
      "</div>" +
      '<div class="col-xs-7">' +
      "<h4>Each Jump block makes the cat move over purple circles and moves him a total of two spaces.</h4>" +
      "</div>" +
      "</div>"
  );

  $("button#newBlockTip").hide();

  //Insert Start block in workspace
  InsertBlock("start", 200, 50, false, true);

  redraw();
}

function LoadLevel14() {
  if (currentLevel != 14) {
    $("#instructionsModal .modal-body").html(
      '<h3>Use the "not" condition to get to the red circle.<h3>'
    );
    $("#instructionsModal").modal("show");
    currentLevel = 14;
    tipToShow = 1;
    totalNumTips = 2;
    numSteps = 7;

    controls_whileUntil_options = [["repeat while", "WHILE"]];
    Blockly.updateToolbox(
      '<xml id="toolbox" style="display: none">' +
        '<block type="controls_whileUntil">' +
        '<field name="MODE">WHILE</field>' +
        '<value name="BOOL">' +
        "<block " +
        'movable="false" ' +
        'type="logic_negate">' +
        '<value name="BOOL">' +
        "<block " +
        'movable="false" ' +
        //'deletable="false" ' +
        'type="target">' +
        "</block>" +
        "</value>" +
        "</block>" +
        "</value>" +
        "</block>" +
        '<block type="walk"></block>' +
        '<block type="jump"></block>' +
        "</xml>"
    );
  }

  player = new Player();
  //player.init_x = 50;
  //player.init_y = 200;

  player.x = player.init_x;
  player.y = player.init_y;

  target = new Target();
  target.y = player.y + player.diameter * 0;
  target.x = player.x + player.diameter * 7; //Position target three steps away from player
  target.color = color(153, 51, 0);

  obstacles = [
    //new Obstacle(player.x + player.diameter*1, player.y),
    //new Obstacle(player.x + player.diameter*4, player.y)
  ];

  $("#tipModal1 .modal-body").html(
    "<h3>To write the best code, you should solve the problem using 3 or less blocks. If you can't do it the first time, just come back later and try again.</h3>"
  );

  $("#tipModal2 .modal-body").html(
    '<h4>Connect the visual blocks in the right way inside the "repeat while" block to get the cat moving.</h4>' +
      '<div class="row">' +
      '<div class="col-xs-6">' +
      '<img src="../images/repeat_while_not_target.png">' +
      "</div>" +
      '<div class="col-xs-6">' +
      '<h4>Repeat the blocks in this "repeat while" while the cat has not reached the red circle. The "repeat while" block is useful when you want to run the same code again and again while a condition is true. You can connect the "Walk" and "Jump" blocks inside it.</h4>' +
      "</div>" +
      "</div>" +
      '<div class="row">' +
      '<div class="col-xs-5">' +
      '<img src="../images/not_target.png">' +
      "</div>" +
      '<div class="col-xs-7">' +
      '<h4>The "not" block is an expression that returns true or false. In this case it returns false if there is a red circle in front.</h4>' +
      "</div>" +
      "</div>" +
      '<div class="row">' +
      '<div class="col-xs-5">' +
      '<img src="../images/walk.png">' +
      "</div>" +
      '<div class="col-xs-7">' +
      "<h4>Each Walk block moves the cat one space to the right.</h4>" +
      "</div>" +
      "</div>" +
      '<div class="row">' +
      '<div class="col-xs-5">' +
      '<img src="../images/jump.png">' +
      "</div>" +
      '<div class="col-xs-7">' +
      "<h4>Each Jump block makes the cat move over purple circles and moves him a total of two spaces.</h4>" +
      "</div>" +
      "</div>"
  );

  $("button#newBlockTip").show();
  $("#newBlockModal .modal-body").html(
    '<div class="row">' +
      '<div class="col-xs-5">' +
      '<img src="../images/not_target.png">' +
      "</div>" +
      '<div class="col-xs-7">' +
      '<h3>The "not" block is an expression that returns true or false. In this case it returns false if there is a red circle in front.</h3>' +
      "</div>" +
      "</div>"
  );

  //Insert Start block in workspace
  InsertBlock("start", 220, 25, false, true);

  redraw();
}

function LoadLevel15() {
  if (currentLevel != 15) {
    $("#instructionsModal .modal-body").html("<h3>Get to the red circle.<h3>");
    $("#instructionsModal").modal("show");
    currentLevel = 15;
    tipToShow = 1;
    totalNumTips = 2;
    numSteps = 9;

    controls_whileUntil_options = [["repeat while", "WHILE"]];
    Blockly.updateToolbox(
      '<xml id="toolbox" style="display: none">' +
        '<block type="controls_whileUntil">' +
        '<field name="MODE">WHILE</field>' +
        '<value name="BOOL">' +
        "<block " +
        'movable="false" ' +
        'type="logic_negate">' +
        '<value name="BOOL">' +
        "<block " +
        'movable="false" ' +
        //'deletable="false" ' +
        'type="target">' +
        "</block>" +
        "</value>" +
        "</block>" +
        "</value>" +
        "</block>" +
        '<block type="walk"></block>' +
        '<block type="jump"></block>' +
        "</xml>"
    );
  }

  player = new Player();
  //player.init_x = 50;
  //player.init_y = 200;

  player.x = player.init_x;
  player.y = player.init_y;

  target = new Target();
  target.y = player.y + player.diameter * 0;
  target.x = player.x + player.diameter * 9; //Position target nine steps away from player
  target.color = color(153, 51, 0);

  obstacles = [
    new Obstacle(player.x + player.diameter * 2, player.y),
    new Obstacle(player.x + player.diameter * 5, player.y),
    new Obstacle(player.x + player.diameter * 8, player.y),
  ];

  $("#tipModal1 .modal-body").html(
    "<h3>To write the best code, you should solve the problem using 4 or less blocks. If you can't do it the first time, just come back later and try again.</h3>"
  );

  $("#tipModal2 .modal-body").html(
    '<h4>Connect the visual blocks in the right way inside the "repeat while" block to get the cat moving.</h4>' +
      '<div class="row">' +
      '<div class="col-xs-6">' +
      '<img src="../images/repeat_while_not_target.png">' +
      "</div>" +
      '<div class="col-xs-6">' +
      '<h4>Repeat the blocks in this "repeat while" while the cat has not reached the red circle. The "repeat while" block is useful when you want to run the same code again and again while a condition is true. You can connect the "Walk" and "Jump" blocks inside it.</h4>' +
      "</div>" +
      "</div>" +
      '<div class="row">' +
      '<div class="col-xs-5">' +
      '<img src="../images/not_target.png">' +
      "</div>" +
      '<div class="col-xs-7">' +
      '<h4>The "not" block is an expression that returns true or false. In this case it returns false if there is a red circle in front.</h4>' +
      "</div>" +
      "</div>" +
      '<div class="row">' +
      '<div class="col-xs-5">' +
      '<img src="../images/walk.png">' +
      "</div>" +
      '<div class="col-xs-7">' +
      "<h4>Each Walk block moves the cat one space to the right.</h4>" +
      "</div>" +
      "</div>" +
      '<div class="row">' +
      '<div class="col-xs-5">' +
      '<img src="../images/jump.png">' +
      "</div>" +
      '<div class="col-xs-7">' +
      "<h4>Each Jump block makes the cat move over purple circles and moves him a total of two spaces.</h4>" +
      "</div>" +
      "</div>"
  );

  $("button#newBlockTip").hide();

  //Insert Start block in workspace
  InsertBlock("start", 220, 25, false, true);

  redraw();
}

function LoadLevel16() {
  if (currentLevel != 16) {
    $("#instructionsModal .modal-body").html(
      "<h3>Use the repeat block to get to the red circle.<h3>"
    );
    $("#instructionsModal").modal("show");
    currentLevel = 16;
    tipToShow = 1;
    totalNumTips = 2;
    numSteps = 9;

    controls_whileUntil_options = [["repeat until", "UNTIL"]];
    Blockly.updateToolbox(
      '<xml id="toolbox" style="display: none">' +
        '<block type="controls_whileUntil">' +
        '<field name="MODE">UNTIL</field>' +
        '<value name="BOOL">' +
        "<block " +
        'movable="false" ' +
        //'deletable="false" ' +
        'type="target">' +
        "</block>" +
        "</value>" +
        "</block>" +
        '<block type="controls_if">' +
        '<value name="IF0">' +
        "<block " +
        'movable="false" ' +
        'type="obstacle">' +
        "</block>" +
        "</value>" +
        "</block>" +
        '<block type="walk"></block>' +
        '<block type="jump"></block>' +
        "</xml>"
    );
  }

  player = new Player();
  //player.init_x = 50;
  //player.init_y = 200;

  player.x = player.init_x;
  player.y = player.init_y;

  target = new Target();
  target.y = player.y + player.diameter * 0;
  target.x = player.x + player.diameter * 9; //Position target nine steps away from player
  target.color = color(153, 51, 0);

  obstacles = [
    new Obstacle(player.x + player.diameter * 2, player.y),
    new Obstacle(player.x + player.diameter * 5, player.y),
    new Obstacle(player.x + player.diameter * 8, player.y),
  ];

  $("#tipModal1 .modal-body").html(
    "<h3>To write the best code, you should solve the problem using 5 or less blocks. If you can't do it the first time, just come back later and try again.</h3>"
  );

  $("#tipModal2 .modal-body").html(
    '<h4>Connect the visual blocks in the right way inside the "repeat until" block to get the cat moving.</h4>' +
      '<div class="row">' +
      '<div class="col-xs-6">' +
      '<img src="../images/repeat_until_target.png">' +
      "</div>" +
      '<div class="col-xs-6">' +
      '<h4>Repeat the blocks in this "repeat until" until the cat has reached the red circle. The "repeat until" block is useful when you want to run the same code again and again until the goal is reached. You can connect the "Walk" and "Jump" blocks inside it.</h4>' +
      "</div>" +
      "</div>" +
      '<div class="row">' +
      '<div class="col-xs-5">' +
      '<img src="../images/if_obstacle.png">' +
      "</div>" +
      '<div class="col-xs-7">' +
      '<h4>Walk the blocks in this "if" only if the cat sees a purple circle ahead.</h4>' +
      "</div>" +
      "</div>" +
      '<div class="row">' +
      '<div class="col-xs-5">' +
      '<img src="../images/walk.png">' +
      "</div>" +
      '<div class="col-xs-7">' +
      "<h4>Each Walk block moves the cat one space to the right.</h4>" +
      "</div>" +
      "</div>" +
      '<div class="row">' +
      '<div class="col-xs-5">' +
      '<img src="../images/jump.png">' +
      "</div>" +
      '<div class="col-xs-7">' +
      "<h4>Each Jump block makes the cat move over purple circles and moves him a total of two spaces.</h4>" +
      "</div>" +
      "</div>"
  );

  $("button#newBlockTip").show();
  $("#newBlockModal .modal-body").html(
    '<div class="row">' +
      '<div class="col-xs-5">' +
      '<img src="../images/if_obstacle.png">' +
      "</div>" +
      '<div class="col-xs-7">' +
      '<h3>The "if" block will only work when the cat sees a purple circle in front of him.</h3>' +
      "</div>" +
      "</div>"
  );

  //Insert Start block in workspace
  InsertBlock("start", 220, 25, false, true);

  redraw();
}

function LoadLevel17() {
  if (currentLevel != 17) {
    $("#instructionsModal .modal-body").html(
      "<h3>Use the repeat block to get to the red circle.<h3>"
    );
    $("#instructionsModal").modal("show");
    currentLevel = 17;
    tipToShow = 1;
    totalNumTips = 2;
    numSteps = 8;

    controls_whileUntil_options = [["repeat until", "UNTIL"]];
    Blockly.updateToolbox(
      '<xml id="toolbox" style="display: none">' +
        '<block type="controls_whileUntil">' +
        '<field name="MODE">UNTIL</field>' +
        '<value name="BOOL">' +
        "<block " +
        'movable="false" ' +
        'type="target">' +
        "</block>" +
        "</value>" +
        "</block>" +
        '<block type="controls_if">' +
        '<value name="IF0">' +
        "<block " +
        'movable="false" ' +
        'type="empty">' +
        "</block>" +
        "</value>" +
        "</block>" +
        '<block type="walk"></block>' +
        '<block type="jump"></block>' +
        "</xml>"
    );
  }

  player = new Player();
  //player.init_x = 50;
  //player.init_y = 200;

  player.x = player.init_x;
  player.y = player.init_y;

  target = new Target();
  target.y = player.y + player.diameter * 0;
  target.x = player.x + player.diameter * 8; //Position target nine steps away from player
  target.color = color(153, 51, 0);

  obstacles = [
    new Obstacle(player.x + player.diameter * 1, player.y),
    new Obstacle(player.x + player.diameter * 4, player.y),
    new Obstacle(player.x + player.diameter * 7, player.y),
  ];

  $("#tipModal1 .modal-body").html(
    "<h3>To write the best code, you should solve the problem using 5 or less blocks. If you can't do it the first time, just come back later and try again.</h3>"
  );

  $("#tipModal2 .modal-body").html(
    '<h4>Connect the visual blocks in the right way inside the "repeat until" block to get the cat moving.</h4>' +
      '<div class="row">' +
      '<div class="col-xs-6">' +
      '<img src="../images/repeat_until_target.png">' +
      "</div>" +
      '<div class="col-xs-6">' +
      '<h4>Repeat the blocks in this "repeat until" until the cat has reached the red circle. The "repeat until" block is useful when you want to run the same code again and again until the goal is reached. You can connect the "Walk" and "Jump" blocks inside it.</h4>' +
      "</div>" +
      "</div>" +
      '<div class="row">' +
      '<div class="col-xs-5">' +
      '<img src="../images/if_empty.png">' +
      "</div>" +
      '<div class="col-xs-7">' +
      '<h4>Walk the blocks in this "if" only if the cat sees a path ahead.</h4>' +
      "</div>" +
      "</div>" +
      '<div class="row">' +
      '<div class="col-xs-5">' +
      '<img src="../images/walk.png">' +
      "</div>" +
      '<div class="col-xs-7">' +
      "<h4>Each Walk block moves the cat one space to the right.</h4>" +
      "</div>" +
      "</div>" +
      '<div class="row">' +
      '<div class="col-xs-5">' +
      '<img src="../images/jump.png">' +
      "</div>" +
      '<div class="col-xs-7">' +
      "<h4>Each Jump block makes the cat move over purple circles and moves him a total of two spaces.</h4>" +
      "</div>" +
      "</div>"
  );

  $("button#newBlockTip").hide();

  //Insert Start block in workspace
  InsertBlock("start", 220, 25, false, true);

  redraw();
}

function LoadLevel18() {
  if (currentLevel != 18) {
    $("#instructionsModal .modal-body").html(
      "<h3>Use conditionals to get to the red circle.<h3>"
    );
    $("#instructionsModal").modal("show");
    currentLevel = 18;
    tipToShow = 1;
    totalNumTips = 3;
    numSteps = 9;

    controls_whileUntil_options = [["repeat until", "UNTIL"]];

    Blockly.updateToolbox(
      '<xml id="toolbox" style="display: none">' +
        '<block type="controls_whileUntil">' +
        '<field name="MODE">UNTIL</field>' +
        '<value name="BOOL">' +
        "<block " +
        'movable="false" ' +
        'type="target">' +
        "</block>" +
        "</value>" +
        "</block>" +
        '<block type="controls_if">' +
        '<value name="IF0">' +
        "<block " +
        'movable="false" ' +
        'type="empty">' +
        "</block>" +
        "</value>" +
        "</block>" +
        '<block type="controls_if">' +
        '<value name="IF0">' +
        "<block " +
        'movable="false" ' +
        'type="obstacle">' +
        "</block>" +
        "</value>" +
        "</block>" +
        '<block type="walk"></block>' +
        '<block type="jump"></block>' +
        "</xml>"
    );
  }

  player = new Player();
  //player.init_x = 50;
  //player.init_y = 200;

  player.x = player.init_x;
  player.y = player.init_y;

  target = new Target();
  target.y = player.y + player.diameter * 0;
  target.x = player.x + player.diameter * 9; //Position target nine steps away from player
  target.color = color(153, 51, 0);

  obstacles = [
    new Obstacle(player.x + player.diameter * 2, player.y),
    new Obstacle(player.x + player.diameter * 4, player.y),
  ];

  $("#tipModal1 .modal-body").html(
    "<h3>To write the best code, you should solve the problem using 6 or less blocks. If you can't do it the first time, just come back later and try again.</h3>"
  );

  $("#tipModal2 .modal-body").html(
    '<h3>If the cat sees a purple circle "Jump". If the cat sees a path "Walk".</h3>'
  );

  $("#tipModal3 .modal-body").html(
    '<h4>Connect the visual blocks in the right way inside the "repeat until" block to get the cat moving.</h4>' +
      '<div class="row">' +
      '<div class="col-xs-6">' +
      '<img src="../images/repeat_until_target.png">' +
      "</div>" +
      '<div class="col-xs-6">' +
      '<h4>Repeat the blocks in this "repeat until" until the cat has reached the red circle. The "repeat until" block is useful when you want to run the same code again and again until the goal is reached. You can connect the "Walk" and "Jump" blocks inside it.</h4>' +
      "</div>" +
      "</div>" +
      '<div class="row">' +
      '<div class="col-xs-5">' +
      '<img src="../images/if_obstacle.png">' +
      "</div>" +
      '<div class="col-xs-7">' +
      '<h4>Walk the blocks in this "if" only if the cat sees a purple circle ahead.</h4>' +
      "</div>" +
      "</div>" +
      '<div class="row">' +
      '<div class="col-xs-5">' +
      '<img src="../images/if_empty.png">' +
      "</div>" +
      '<div class="col-xs-7">' +
      '<h4>Walk the blocks in this "if" only if the cat sees a path ahead.</h4>' +
      "</div>" +
      "</div>" +
      '<div class="row">' +
      '<div class="col-xs-5">' +
      '<img src="../images/walk.png">' +
      "</div>" +
      '<div class="col-xs-7">' +
      "<h4>Each Walk block moves the cat one space to the right.</h4>" +
      "</div>" +
      "</div>" +
      '<div class="row">' +
      '<div class="col-xs-5">' +
      '<img src="../images/jump.png">' +
      "</div>" +
      '<div class="col-xs-7">' +
      "<h4>Each Jump block makes the cat move over purple circles and moves him a total of two spaces.</h4>" +
      "</div>" +
      "</div>"
  );

  $("button#newBlockTip").hide();

  //Insert Start block in workspace
  InsertBlock("start", 220, 25, false, true);

  redraw();
}

function LoadLevel19() {
  if (currentLevel != 19) {
    $("#instructionsModal .modal-body").html(
      "<h3>Use conditionals to get to the red circle.<h3>"
    );
    $("#instructionsModal").modal("show");
    currentLevel = 19;
    tipToShow = 1;
    totalNumTips = 3;
    numSteps = 9;

    controls_whileUntil_options = [["repeat until", "UNTIL"]];

    Blockly.updateToolbox(
      '<xml id="toolbox" style="display: none">' +
        '<block type="controls_whileUntil">' +
        '<field name="MODE">UNTIL</field>' +
        '<value name="BOOL">' +
        "<block " +
        'movable="false" ' +
        'type="target">' +
        "</block>" +
        "</value>" +
        "</block>" +
        '<block type="controls_if">' +
        '<mutation else="1"></mutation>' +
        '<value name="IF0">' +
        "<block " +
        'movable="false" ' +
        'type="obstacle">' +
        "</block>" +
        "</value>" +
        "</block>" +
        '<block type="walk"></block>' +
        '<block type="jump"></block>' +
        "</xml>"
    );
  }

  player = new Player();
  //player.init_x = 50;
  //player.init_y = 200;

  player.x = player.init_x;
  player.y = player.init_y;

  target = new Target();
  target.y = player.y + player.diameter * 0;
  target.x = player.x + player.diameter * 9; //Position target nine steps away from player
  target.color = color(153, 51, 0);

  obstacles = [
    new Obstacle(player.x + player.diameter * 2, player.y),
    new Obstacle(player.x + player.diameter * 4, player.y),
    new Obstacle(player.x + player.diameter * 8, player.y),
  ];

  $("#tipModal1 .modal-body").html(
    "<h3>To write the best code, you should solve the problem using 5 or less blocks. If you can't do it the first time, just come back later and try again.</h3>"
  );

  $("#tipModal2 .modal-body").html(
    '<h3>If the cat sees a purple circle "Jump". Otherwise, if the cat sees a path "Walk".</h3>'
  );

  $("#tipModal3 .modal-body").html(
    '<h4>Connect the visual blocks in the right way inside the "repeat until" block to get the cat moving.</h4>' +
      '<div class="row">' +
      '<div class="col-xs-6">' +
      '<img src="../images/repeat_until_target.png">' +
      "</div>" +
      '<div class="col-xs-6">' +
      '<h4>Repeat the blocks in this "repeat until" until the cat has reached the red circle. The "repeat until" block is useful when you want to run the same code again and again until the goal is reached. You can connect the "Walk" and "Jump" blocks inside it.</h4>' +
      "</div>" +
      "</div>" +
      '<div class="row">' +
      '<div class="col-xs-5">' +
      '<img src="../images/if_obstacle_else.png">' +
      "</div>" +
      '<div class="col-xs-7">' +
      '<h4>If there is a purple circle ahead, run the blocks in the first "If" section. Otherwise, run the blocks in the second "Else" section.</h4>' +
      "</div>" +
      "</div>" +
      '<div class="row">' +
      '<div class="col-xs-5">' +
      '<img src="../images/walk.png">' +
      "</div>" +
      '<div class="col-xs-7">' +
      "<h4>Each Walk block moves the cat one space to the right.</h4>" +
      "</div>" +
      "</div>" +
      '<div class="row">' +
      '<div class="col-xs-5">' +
      '<img src="../images/jump.png">' +
      "</div>" +
      '<div class="col-xs-7">' +
      "<h4>Each Jump block makes the cat move over purple circles and moves him a total of two spaces.</h4>" +
      "</div>" +
      "</div>"
  );

  $("button#newBlockTip").show();
  $("#newBlockModal .modal-body").html(
    '<div class="row">' +
      '<div class="col-xs-5">' +
      '<img src="../images/if_obstacle_else.png">' +
      "</div>" +
      '<div class="col-xs-7">' +
      '<h3>If there is a purple circle ahead, run the blocks in the first "If" section. Otherwise run the blocks in the second "Else" section.</h3>' +
      "</div>" +
      "</div>"
  );

  //Insert Start block in workspace
  InsertBlock("start", 220, 25, false, true);

  redraw();
}

function LoadLevel20() {
  if (currentLevel != 20) {
    $("#instructionsModal .modal-body").html(
      "<h3>Use the if-else conditional to get to the red circle.<h3>"
    );
    $("#instructionsModal").modal("show");
    currentLevel = 20;
    tipToShow = 1;
    totalNumTips = 3;
    numSteps = 9;

    controls_whileUntil_options = [["repeat until", "UNTIL"]];

    Blockly.updateToolbox(
      '<xml id="toolbox" style="display: none">' +
        '<block type="controls_whileUntil">' +
        '<field name="MODE">UNTIL</field>' +
        '<value name="BOOL">' +
        "<block " +
        'movable="false" ' +
        'type="target">' +
        "</block>" +
        "</value>" +
        "</block>" +
        '<block type="controls_if">' +
        '<mutation else="1"></mutation>' +
        '<value name="IF0">' +
        "<block " +
        'movable="false" ' +
        'type="empty">' +
        "</block>" +
        "</value>" +
        "</block>" +
        '<block type="walk"></block>' +
        '<block type="jump"></block>' +
        "</xml>"
    );
  }

  player = new Player();
  //player.init_x = 50;
  //player.init_y = 200;

  player.x = player.init_x;
  player.y = player.init_y;

  target = new Target();
  target.y = player.y + player.diameter * 0;
  target.x = player.x + player.diameter * 9; //Position target nine steps away from player
  target.color = color(153, 51, 0);

  obstacles = [
    new Obstacle(player.x + player.diameter * 2, player.y),
    new Obstacle(player.x + player.diameter * 8, player.y),
  ];

  $("#tipModal1 .modal-body").html(
    "<h3>To write the best code, you should solve the problem using 5 or less blocks. If you can't do it the first time, just come back later and try again.</h3>"
  );

  $("#tipModal2 .modal-body").html(
    '<h3>If the cat sees a purple circle "Jump". Otherwise, if the cat sees a path "Walk".</h3>'
  );

  $("#tipModal3 .modal-body").html(
    '<h4>Connect the visual blocks in the right way inside the "repeat until" block to get the cat moving.</h4>' +
      '<div class="row">' +
      '<div class="col-xs-6">' +
      '<img src="../images/repeat_until_target.png">' +
      "</div>" +
      '<div class="col-xs-6">' +
      '<h4>Repeat the blocks in this "repeat until" until the cat has reached the red circle. The "repeat until" block is useful when you want to run the same code again and again until the goal is reached. You can connect the "Walk" and "Jump" blocks inside it.</h4>' +
      "</div>" +
      "</div>" +
      '<div class="row">' +
      '<div class="col-xs-5">' +
      '<img src="../images/if_empty_else.png">' +
      "</div>" +
      '<div class="col-xs-7">' +
      '<h4>If the cat sees a path ahead, run the blocks in the first "If" section. Otherwise, run the blocks in the second "Else" section.</h4>' +
      "</div>" +
      "</div>" +
      '<div class="row">' +
      '<div class="col-xs-5">' +
      '<img src="../images/walk.png">' +
      "</div>" +
      '<div class="col-xs-7">' +
      "<h4>Each Walk block moves the cat one space to the right.</h4>" +
      "</div>" +
      "</div>" +
      '<div class="row">' +
      '<div class="col-xs-5">' +
      '<img src="../images/jump.png">' +
      "</div>" +
      '<div class="col-xs-7">' +
      "<h4>Each Jump block makes the cat move over purple circles and moves him a total of two spaces.</h4>" +
      "</div>" +
      "</div>"
  );

  $("button#newBlockTip").hide();

  //Insert Start block in workspace
  InsertBlock("start", 220, 25, false, true);

  redraw();
}

//WORLD 2
function LoadLevel21() {
  if (currentLevel != 21) {
    $("#instructionsModal .modal-body").html(
      "<h3>Can you move the bogo to the green circle?</h3>"
    );
    $("#instructionsModal").modal("show");
    currentLevel = 21;
    tipToShow = 1;
    totalNumTips = 3;
    numSteps = 2;
  }

  player = new Player();
  //player.init_x = 100;
  //player.init_y = 200;

  player.x = player.init_x;
  player.y = player.init_y;

  target = new Target();
  target.y = player.y + player.diameter * 0;
  target.x = player.x + player.diameter * 2; //Position target one steps away from player
  target.color = color(51, 153, 0);

  obstacles = [];

  Blockly.updateToolbox(
    '<xml id="toolbox" style="display: none">' +
      "<block " +
      'type="walk">' +
      "</block>" +
      "</xml>"
  );

  $("#tipModal1 .modal-body").html(
    '<h3>You need to connect the "Walk" block. Try using more than one "Walk" block.</h3>'
  );

  $("#tipModal2 .modal-body").html(
    "<h3>To write the best code, you should solve the problem using 3 or less blocks. If you can't do it the first time, just come back later and try again.</h3>"
  );

  $("#tipModal3 .modal-body").html(
    '<h3>You need to program the bogo to walk towards the green circle. Connect the visual blocks in the right way to make the bogo walk. Try using more than one "Walk" block.</h3>' +
      '<div class="row">' +
      '<div class="col-xs-3">' +
      '<img src="../images/start.png">' +
      "</div>" +
      '<div class="col-xs-9">' +
      "<h3>This is the first block of your program. Add blocks under this one.</h3>" +
      "</div>" +
      "</div>" +
      '<div class="row">' +
      '<div class="col-xs-3">' +
      '<img src="../images/walk.png">' +
      "</div>" +
      '<div class="col-xs-9">' +
      "<h3>Each Walk block moves the bogo one step forward to the next space on the path.</h3>" +
      "</div>" +
      "</div>"
  );

  $("button#newBlockTip").show();
  $("#newBlockModal .modal-body").html(
    '<div class="row">' +
      '<div class="col-xs-5">' +
      '<img src="../images/walk.png">' +
      "</div>" +
      '<div class="col-xs-7">' +
      "<h3>Each Walk block makes the bogo walk one step forward to the next space on the path.</h3>" +
      "</div>" +
      "</div>"
  );

  //Insert Start block in workspace
  InsertBlock("start", 150, 50, false, true);

  redraw();
}

function LoadLevel22() {
  if (currentLevel != 22) {
    $("#instructionsModal .modal-body").html(
      "<h3>Can you move the bogo to the green circle?</h3>"
    );
    $("#instructionsModal").modal("show");
    currentLevel = 22;
    tipToShow = 1;
    totalNumTips = 3;
    numSteps = 4;
  }

  player = new Player();
  //player.init_x = 100;
  //player.init_y = 200;

  player.x = player.init_x;
  player.y = player.init_y;

  target = new Target();
  target.y = player.y + player.diameter * 0;
  target.x = player.x + player.diameter * 4; //Position target one steps away from player
  target.color = color(51, 153, 0);

  obstacles = [];

  Blockly.updateToolbox(
    '<xml id="toolbox" style="display: none">' +
      "<block " +
      'type="walk">' +
      "</block>" +
      "</xml>"
  );

  $("#tipModal1 .modal-body").html(
    '<h3>Try connecting more than one "Walk" block to reach the green circle.</h3>'
  );

  $("#tipModal2 .modal-body").html(
    "<h3>To write the best code, you should solve the problem using 5 or less blocks. If you can't do it the first time, just come back later and try again.</h3>"
  );

  $("#tipModal3 .modal-body").html(
    '<h3>You need to program the bogo to walk towards the green circle. Connect the visual blocks in the right way to make the bogo walk. Try using many "Walk" block.</h3>' +
      '<div class="row">' +
      '<div class="col-xs-3">' +
      '<img src="../images/start.png">' +
      "</div>" +
      '<div class="col-xs-9">' +
      "<h3>This is the first block of your program. Add blocks under this one.</h3>" +
      "</div>" +
      "</div>" +
      '<div class="row">' +
      '<div class="col-xs-3">' +
      '<img src="../images/walk.png">' +
      "</div>" +
      '<div class="col-xs-9">' +
      "<h3>Each Walk block moves the bogo one step forward to the next space on the path.</h3>" +
      "</div>" +
      "</div>"
  );

  $("button#newBlockTip").hide();

  //Insert Start block in workspace
  InsertBlock("start", 150, 50, false, true);

  redraw();
}

function LoadLevel23() {
  if (currentLevel != 23) {
    $("#instructionsModal .modal-body").html(
      "<h3>Use Walk and Jump to avoid the obstacles.</h3>"
    );
    $("#instructionsModal").modal("show");
    currentLevel = 23;
    tipToShow = 1;
    totalNumTips = 3;
    numSteps = 5;
  }

  player = new Player();
  //player.init_x = 100;
  //player.init_y = 200;

  player.x = player.init_x;
  player.y = player.init_y;

  target = new Target();
  target.y = player.y + player.diameter * 0;
  target.x = player.x + player.diameter * 5; //Position target one steps away from player
  target.color = color(51, 153, 0);

  obstacles = [new Obstacle(player.x + player.diameter * 3, player.y)];

  Blockly.updateToolbox(
    '<xml id="toolbox" style="display: none">' +
      "<block " +
      'type="walk">' +
      "</block>" +
      '<block type="jump"></block>' +
      "</xml>"
  );

  $("#tipModal1 .modal-body").html(
    '<h3>Try using the "Walk" and "Jump" block to walk and jump over the orange rectangle.</h3>'
  );

  $("#tipModal2 .modal-body").html(
    "<h3>To write the best code, you should solve the problem using 5 or less blocks. If you can't do it the first time, just come back later and try again.</h3>"
  );

  $("#tipModal3 .modal-body").html(
    '<h3>You need to program the bogo to walk towards the green circle. Connect the visual blocks in the right way to make the bogo walk. Try using many "Walk" and "Jump" blocks.</h3>' +
      '<div class="row">' +
      '<div class="col-xs-3">' +
      '<img src="../images/start.png">' +
      "</div>" +
      '<div class="col-xs-9">' +
      "<h3>This is the first block of your program. Add blocks under this one.</h3>" +
      "</div>" +
      "</div>" +
      '<div class="row">' +
      '<div class="col-xs-3">' +
      '<img src="../images/walk.png">' +
      "</div>" +
      '<div class="col-xs-9">' +
      "<h3>Each Walk block moves the bogo one step forward to the next space on the path.</h3>" +
      "</div>" +
      "</div>" +
      '<div class="row">' +
      '<div class="col-xs-3">' +
      '<img src="../images/jump.png">' +
      "</div>" +
      '<div class="col-xs-9">' +
      "<h3>Each Jump block makes the bogo jump over the orange rectangle and moves him two steps forward.</h3>" +
      "</div>" +
      "</div>"
  );

  $("button#newBlockTip").show();
  $("#newBlockModal .modal-body").html(
    '<div class="row">' +
      '<div class="col-xs-5">' +
      '<img src="../images/jump.png">' +
      "</div>" +
      '<div class="col-xs-7">' +
      "<h3>Each Jump block makes the bogo jump over the orange circles and moves him two steps forward.</h3>" +
      "</div>" +
      "</div>"
  );

  //Insert Start block in workspace
  InsertBlock("start", 150, 50, false, true);

  redraw();
}

function LoadLevel24() {
  if (currentLevel != 24) {
    $("#instructionsModal .modal-body").html(
      "<h3>Get the bogo to the green circle.</h3>"
    );
    $("#instructionsModal").modal("show");
    currentLevel = 24;
    tipToShow = 1;
    totalNumTips = 2;
    numSteps = 9;
  }

  player = new Player();
  //player.init_x = 100;
  //player.init_y = 200;

  player.x = player.init_x;
  player.y = player.init_y;

  target = new Target();
  target.y = player.y + player.diameter * 0;
  target.x = player.x + player.diameter * 9; //Position target one steps away from player
  target.color = color(51, 153, 0);

  obstacles = [
    //new Obstacle(player.x + player.diameter*3, player.y)
  ];

  Blockly.updateToolbox(
    '<xml id="toolbox" style="display: none">' +
      '<block type="controls_repeat">' +
      '<field name="TIMES">9</field>' +
      "</block>" +
      "<block " +
      'type="walk">' +
      "</block>" +
      "</xml>"
  );

  $("#tipModal1 .modal-body").html(
    "<h3>To write the best code, you should solve the problem using 3 or less blocks. If you can't do it the first time, just come back later and try again.</h3>"
  );

  $("#tipModal2 .modal-body").html(
    '<h3>Try using the "Repeat" block with a "Walk" block inside. Change the number to change the number of times to repeat.</h3>' +
      '<h3>Connect the visual blocks in the right way to get the bogo moving. Try using the "Repeat" and "Walk" blocks.</h3>' +
      '<div class="row">' +
      '<div class="col-xs-3">' +
      '<img src="../images/repeat9.png">' +
      "</div>" +
      '<div class="col-xs-9">' +
      '<h3>Repeats the blocks in this "Repeat" block 9 times. The "Repeat" block is useful when you want to run the same code again and again. You can connect the "Walk" and "Jump" blocks inside it. You can also change the number of times you want to repeat the code.</h3>' +
      "</div>" +
      "</div>" +
      '<div class="row">' +
      '<div class="col-xs-3">' +
      '<img src="../images/walk.png">' +
      "</div>" +
      '<div class="col-xs-9">' +
      "<h3>Each Walk block moves the bogo one step forward to the next space on the path.</h3>" +
      "</div>" +
      "</div>"
  );

  $("button#newBlockTip").show();
  $("#newBlockModal .modal-body").html(
    '<div class="row">' +
      '<div class="col-xs-5">' +
      '<img src="../images/repeat9.png">' +
      "</div>" +
      '<div class="col-xs-7">' +
      '<h3>Repeats the blocks in this "Repeat" block 9 times. The "Repeat" block is useful when you want to run the same code again and again. You can connect the "Walk" and "Jump" blocks inside it. You can also change the number of times you want to repeat the code.</h3>' +
      "</div>" +
      "</div>"
  );

  //Insert Start block in workspace
  InsertBlock("start", 150, 50, false, true);

  redraw();
}

function LoadLevel25() {
  if (currentLevel != 25) {
    $("#instructionsModal .modal-body").html("<h3>Avoid the obstacles</h3>");
    $("#instructionsModal").modal("show");
    currentLevel = 25;
    tipToShow = 1;
    totalNumTips = 2;
    numSteps = 9;
  }

  player = new Player();
  //player.init_x = 100;
  //player.init_y = 200;

  player.x = player.init_x;
  player.y = player.init_y;

  target = new Target();
  target.y = player.y + player.diameter * 0;
  target.x = player.x + player.diameter * 9; //Position target one steps away from player
  target.color = color(51, 153, 0);

  obstacles = [
    new Obstacle(player.x + player.diameter * 2, player.y),
    new Obstacle(player.x + player.diameter * 5, player.y),
    new Obstacle(player.x + player.diameter * 8, player.y),
  ];

  Blockly.updateToolbox(
    '<xml id="toolbox" style="display: none">' +
      '<block type="controls_repeat">' +
      '<field name="TIMES">3</field>' +
      "</block>" +
      "<block " +
      'type="walk">' +
      "</block>" +
      "<block " +
      'type="jump">' +
      "</block>" +
      "</xml>"
  );

  $("#tipModal1 .modal-body").html(
    "<h3>To write the best code, you should solve the problem using 4 or less blocks. If you can't do it the first time, just come back later and try again.</h3>"
  );

  $("#tipModal2 .modal-body").html(
    '<h3>Try using the "Repeat" block with a "Walk" and "Jump" blocks inside.</h3>' +
      '<h3>Connect the visual blocks in the right way to get the bogo moving. Try using the "Walk" and "Jump" blocks inside the "Repeat" block.</h3>' +
      '<div class="row">' +
      '<div class="col-xs-3">' +
      '<img src="../images/repeat3.png">' +
      "</div>" +
      '<div class="col-xs-9">' +
      '<h3>Repeats the blocks in this "Repeat" block 3 times. The "Repeat" block is useful when you want to run the same code again and again. You can connect the "Walk" and "Jump" blocks inside it. You can also change the number of times you want to repeat the code.</h3>' +
      "</div>" +
      "</div>" +
      '<div class="row">' +
      '<div class="col-xs-3">' +
      '<img src="../images/walk.png">' +
      "</div>" +
      '<div class="col-xs-9">' +
      "<h3>Each Walk block moves the bogo one step forward to the next space on the path.</h3>" +
      "</div>" +
      "</div>" +
      '<div class="row">' +
      '<div class="col-xs-3">' +
      '<img src="../images/jump.png">' +
      "</div>" +
      '<div class="col-xs-9">' +
      "<h3>Each Jump block makes the bogo jump over the orange rectangle and moves him two steps forward.</h3>" +
      "</div>" +
      "</div>"
  );

  $("button#newBlockTip").hide();
  //$("#newBlockModal .modal-body").html(
  //  '<div class="row">'+
  //  '<div class="col-xs-5">'+
  //  '<img src="../images/repeat9.png">'+
  //  '</div>'+
  //  '<div class="col-xs-7">'+
  //  '<h3>Repeats the blocks in this "Repeat" block 9 times. The "Repeat" block is useful when you want to run the same code again and again. You can connect the "Walk" and "Jump" blocks inside it. You can also change the number of times you want to repeat the code.</h3>'+
  //  '</div>'+
  //  '</div>'
  //);

  //Insert Start block in workspace
  InsertBlock("start", 150, 50, false, true);

  redraw();
}

function LoadLevel26() {
  if (currentLevel != 26) {
    $("#instructionsModal .modal-body").html(
      "<h3>Reach the green circle, but avoid the orange squares.</h3>"
    );
    $("#instructionsModal").modal("show");
    currentLevel = 26;
    tipToShow = 1;
    totalNumTips = 2;
    numSteps = 9;
  }

  player = new Player();
  //player.init_x = 100;
  //player.init_y = 200;

  player.x = player.init_x;
  player.y = player.init_y;

  target = new Target();
  target.y = player.y + player.diameter * 0;
  target.x = player.x + player.diameter * 9; //Position target one steps away from player
  target.color = color(51, 153, 0);

  obstacles = [
    new Obstacle(player.x + player.diameter * 1, player.y),
    new Obstacle(player.x + player.diameter * 4, player.y),
    new Obstacle(player.x + player.diameter * 7, player.y),
  ];

  Blockly.updateToolbox(
    '<xml id="toolbox" style="display: none">' +
      '<block type="controls_repeat">' +
      '<field name="TIMES">3</field>' +
      "</block>" +
      "<block " +
      'type="walk">' +
      "</block>" +
      "<block " +
      'type="jump">' +
      "</block>" +
      "</xml>"
  );

  $("#tipModal1 .modal-body").html(
    "<h3>To write the best code, you should solve the problem using 4 or less blocks. If you can't do it the first time, just come back later and try again.</h3>"
  );

  $("#tipModal2 .modal-body").html(
    '<h3>Try using the "Repeat" block with a "Walk" and "Jump" blocks inside.</h3>' +
      '<h3>Connect the visual blocks in the right way to get the bogo moving. Try using the "Walk" and "Jump" blocks inside the "Repeat" block.</h3>' +
      '<div class="row">' +
      '<div class="col-xs-3">' +
      '<img src="../images/repeat3.png">' +
      "</div>" +
      '<div class="col-xs-9">' +
      '<h3>Repeats the blocks in this "Repeat" block 3 times. The "Repeat" block is useful when you want to run the same code again and again. You can connect the "Walk" and "Jump" blocks inside it. You can also change the number of times you want to repeat the code.</h3>' +
      "</div>" +
      "</div>" +
      '<div class="row">' +
      '<div class="col-xs-3">' +
      '<img src="../images/walk.png">' +
      "</div>" +
      '<div class="col-xs-9">' +
      "<h3>Each Walk block moves the bogo one step forward to the next space on the path.</h3>" +
      "</div>" +
      "</div>" +
      '<div class="row">' +
      '<div class="col-xs-3">' +
      '<img src="../images/jump.png">' +
      "</div>" +
      '<div class="col-xs-9">' +
      "<h3>Each Jump block makes the bogo jump over the orange rectangle and moves him two steps forward.</h3>" +
      "</div>" +
      "</div>"
  );

  $("button#newBlockTip").hide();
  //$("#newBlockModal .modal-body").html(
  //  '<div class="row">'+
  //  '<div class="col-xs-5">'+
  //  '<img src="../images/repeat9.png">'+
  //  '</div>'+
  //  '<div class="col-xs-7">'+
  //  '<h3>Repeats the blocks in this "Repeat" block 9 times. The "Repeat" block is useful when you want to run the same code again and again. You can connect the "Walk" and "Jump" blocks inside it. You can also change the number of times you want to repeat the code.</h3>'+
  //  '</div>'+
  //  '</div>'
  //);

  //Insert Start block in workspace
  InsertBlock("start", 150, 50, false, true);

  redraw();
}

function LoadLevel27() {
  if (currentLevel != 27) {
    $("#instructionsModal .modal-body").html(
      "<h3>Reach the green circle, but avoid the orange squares.</h3>"
    );
    $("#instructionsModal").modal("show");
    currentLevel = 27;
    tipToShow = 1;
    totalNumTips = 2;
    numSteps = 9;
  }

  player = new Player();
  //player.init_x = 100;
  //player.init_y = 200;

  player.x = player.init_x;
  player.y = player.init_y;

  target = new Target();
  target.y = player.y + player.diameter * 0;
  target.x = player.x + player.diameter * 8; //Position target one steps away from player
  target.color = color(51, 153, 0);

  obstacles = [new Obstacle(player.x + player.diameter * 4, player.y)];

  Blockly.updateToolbox(
    '<xml id="toolbox" style="display: none">' +
      '<block type="controls_repeat">' +
      '<field name="TIMES">3</field>' +
      "</block>" +
      "<block " +
      'type="walk">' +
      "</block>" +
      "<block " +
      'type="jump">' +
      "</block>" +
      "</xml>"
  );

  $("#tipModal1 .modal-body").html(
    "<h3>To write the best code, you should solve the problem using 6 or less blocks. If you can't do it the first time, just come back later and try again.</h3>"
  );

  $("#tipModal2 .modal-body").html(
    '<h3>Try using the "Repeat" block with a "Walk" and "Jump" blocks inside.</h3>' +
      '<h3>Connect the visual blocks in the right way to get the bogo moving. Try using the "Walk" and "Jump" blocks inside the "Repeat" block.</h3>' +
      '<div class="row">' +
      '<div class="col-xs-3">' +
      '<img src="../images/repeat3.png">' +
      "</div>" +
      '<div class="col-xs-9">' +
      '<h3>Repeats the blocks in this "Repeat" block 3 times. The "Repeat" block is useful when you want to run the same code again and again. You can connect the "Walk" and "Jump" blocks inside it. You can also change the number of times you want to repeat the code.</h3>' +
      "</div>" +
      "</div>" +
      '<div class="row">' +
      '<div class="col-xs-3">' +
      '<img src="../images/walk.png">' +
      "</div>" +
      '<div class="col-xs-9">' +
      "<h3>Each Walk block moves the bogo one step forward to the next space on the path.</h3>" +
      "</div>" +
      "</div>" +
      '<div class="row">' +
      '<div class="col-xs-3">' +
      '<img src="../images/jump.png">' +
      "</div>" +
      '<div class="col-xs-9">' +
      "<h3>Each Jump block makes the bogo jump over the orange rectangle and moves him two steps forward.</h3>" +
      "</div>" +
      "</div>"
  );

  $("button#newBlockTip").hide();
  //$("#newBlockModal .modal-body").html(
  //  '<div class="row">'+
  //  '<div class="col-xs-5">'+
  //  '<img src="../images/repeat9.png">'+
  //  '</div>'+
  //  '<div class="col-xs-7">'+
  //  '<h3>Repeats the blocks in this "Repeat" block 9 times. The "Repeat" block is useful when you want to run the same code again and again. You can connect the "Walk" and "Jump" blocks inside it. You can also change the number of times you want to repeat the code.</h3>'+
  //  '</div>'+
  //  '</div>'
  //);

  //Insert Start block in workspace
  InsertBlock("start", 150, 50, false, true);

  redraw();
}

function LoadLevel28() {
  if (currentLevel != 28) {
    $("#instructionsModal .modal-body").html(
      "<h3>Reach the green circle, but jump if there is an orange square.</h3>"
    );
    $("#instructionsModal").modal("show");
    currentLevel = 28;
    tipToShow = 1;
    totalNumTips = 2;
    numSteps = 3;
  }

  player = new Player();
  //player.init_x = 100;
  //player.init_y = 200;

  player.x = player.init_x;
  player.y = player.init_y;

  target = new Target();
  target.y = player.y + player.diameter * 0;
  target.x = player.x + player.diameter * 3; //Position target one steps away from player
  target.color = color(51, 153, 0);

  obstacles = [new Obstacle(player.x + player.diameter * 1, player.y)];

  Blockly.updateToolbox(
    '<xml id="toolbox" style="display: none">' +
      "<block " +
      //'editable="false"'+
      'type="controls_if">' +
      '<value name="IF0">' +
      "<block " +
      'movable="false" ' +
      'type="obstacle2">' +
      "</block>" +
      "</value>" +
      '<value name="DO0">' +
      "<block " +
      'movable="false" ' +
      'type="jump">' +
      "</block>" +
      "</value>" +
      "</block>" +
      "<block " +
      'type="walk">' +
      "</block>" +
      "<block " +
      'type="jump">' +
      "</block>" +
      "</xml>"
  );

  $("#tipModal1 .modal-body").html(
    "<h3>To write the best code, you should solve the problem using 4 or less blocks. If you can't do it the first time, just come back later and try again.</h3>"
  );

  $("#tipModal2 .modal-body").html(
    '<h3>Try using the "If" block with "Jump" block inside to avoid the orange rectangle.</h3>' +
      '<h3>Connect the visual blocks in the right way to get the bogo moving. Try using the "If" block with the "Jump" block.</h3>' +
      '<div class="row">' +
      '<div class="col-xs-5">' +
      '<img src="../images/if_obstacle_then.png">' +
      "</div>" +
      '<div class="col-xs-7">' +
      '<h3>Walk the blocks in this "If" only if the bogo sees an orange rectangle ahead.</h3>' +
      "</div>" +
      "</div>" +
      '<div class="row">' +
      '<div class="col-xs-3">' +
      '<img src="../images/walk.png">' +
      "</div>" +
      '<div class="col-xs-9">' +
      "<h3>Each Walk block moves the bogo one step forward to the next space on the path.</h3>" +
      "</div>" +
      "</div>" +
      '<div class="row">' +
      '<div class="col-xs-3">' +
      '<img src="../images/jump.png">' +
      "</div>" +
      '<div class="col-xs-9">' +
      "<h3>Each Jump block makes the bogo jump over the orange rectangle and moves him two steps forward.</h3>" +
      "</div>" +
      "</div>"
  );

  $("button#newBlockTip").show();
  $("#newBlockModal .modal-body").html(
    '<div class="row">' +
      '<div class="col-xs-5">' +
      '<img src="../images/if_obstacle_then.png">' +
      "</div>" +
      '<div class="col-xs-7">' +
      '<h3>Walk the blocks in this "If" only if the bogo sees an orange rectangle ahead.</h3>' +
      "</div>" +
      "</div>"
  );

  //Insert Start block in workspace
  InsertBlock("start", 150, 50, false, true);

  redraw();
}

function LoadLevel29() {
  if (currentLevel != 29) {
    $("#instructionsModal .modal-body").html(
      "<h3>Reach the green circle, but jump if there is an orange square.</h3>"
    );
    $("#instructionsModal").modal("show");
    currentLevel = 29;
    tipToShow = 1;
    totalNumTips = 2;
    numSteps = 2;
  }

  player = new Player();
  //player.init_x = 100;
  //player.init_y = 200;

  player.x = player.init_x;
  player.y = player.init_y;

  target = new Target();
  target.y = player.y + player.diameter * 0;
  target.x = player.x + player.diameter * 2; //Position target one steps away from player
  target.color = color(51, 153, 0);

  obstacles = [new Obstacle(player.x + player.diameter * 1, player.y)];

  Blockly.updateToolbox(
    '<xml id="toolbox" style="display: none">' +
      '<block type="controls_if">' +
      '<mutation else="1"></mutation>' +
      '<value name="IF0">' +
      "<block " +
      'movable="false" ' +
      'type="obstacle2">' +
      "</block>" +
      "</value>" +
      '<value name="DO0">' +
      "<block " +
      'movable="false" ' +
      'type="jump">' +
      "</block>" +
      "</value>" +
      '<value name="ELSE">' +
      "<block " +
      'movable="false" ' +
      'type="walk">' +
      "</block>" +
      "</value>" +
      "</block>" +
      "<block " +
      'type="walk">' +
      "</block>" +
      "</xml>"
  );

  $("#tipModal1 .modal-body").html(
    "<h3>To write the best code, you should solve the problem using 4 or less blocks. If you can't do it the first time, just come back later and try again.</h3>"
  );

  $("#tipModal2 .modal-body").html(
    '<h3>Try using the "If-Else" block with "Jump" block inside to avoid the orange rectangle.</h3>' +
      '<h3>Connect the visual blocks in the right way to get the bogo moving. Try using the "If-Else" block with the "Jump" block.</h3>' +
      '<div class="row">' +
      '<div class="col-xs-5">' +
      '<img src="../images/if_obstacle_then_else.png">' +
      "</div>" +
      '<div class="col-xs-7">' +
      '<h3>If the bogo sees an orange rectangle ahead, run the blocks in the first "If" section. Otherwise, run the blocks in the second "Else" section.</h3>' +
      "</div>" +
      "</div>" +
      '<div class="row">' +
      '<div class="col-xs-3">' +
      '<img src="../images/walk.png">' +
      "</div>" +
      '<div class="col-xs-9">' +
      "<h3>Each Walk block moves the bogo one step forward to the next space on the path.</h3>" +
      "</div>" +
      "</div>" +
      '<div class="row">' +
      '<div class="col-xs-3">' +
      '<img src="../images/jump.png">' +
      "</div>" +
      '<div class="col-xs-9">' +
      "<h3>Each Jump block makes the bogo jump over the orange rectangle and moves him two steps forward.</h3>" +
      "</div>" +
      "</div>"
  );

  $("button#newBlockTip").show();
  $("#newBlockModal .modal-body").html(
    '<div class="row">' +
      '<div class="col-xs-5">' +
      '<img src="../images/if_obstacle_then_else.png">' +
      "</div>" +
      '<div class="col-xs-7">' +
      '<h3>If the bogo sees an orange rectangle ahead, run the blocks in the first "If" section. Otherwise, run the blocks in the second "Else" section.</h3>' +
      "</div>" +
      "</div>"
  );

  //Insert Start block in workspace
  InsertBlock("start", 150, 50, false, true);

  redraw();
}

function LoadLevel30() {
  if (currentLevel != 30) {
    $("#instructionsModal .modal-body").html(
      "<h3>Reach the green circle, but avoid the orange squares.</h3>"
    );
    $("#instructionsModal").modal("show");
    currentLevel = 30;
    tipToShow = 1;
    totalNumTips = 3;
    numSteps = 9;
  }

  player = new Player();
  //player.init_x = 100;
  //player.init_y = 200;

  player.x = player.init_x;
  player.y = player.init_y;

  target = new Target();
  target.y = player.y + player.diameter * 0;
  target.x = player.x + player.diameter * 9; //Position target one steps away from player
  target.color = color(51, 153, 0);

  obstacles = [
    new Obstacle(player.x + player.diameter * 1, player.y),
    new Obstacle(player.x + player.diameter * 5, player.y),
    new Obstacle(player.x + player.diameter * 7, player.y),
  ];

  Blockly.updateToolbox(
    '<xml id="toolbox" style="display: none">' +
      '<block type="controls_whileUntil">' +
      '<field name="MODE">UNTIL</field>' +
      '<value name="BOOL">' +
      "<block " +
      'movable="false" ' +
      'type="target2">' +
      "</block>" +
      "</value>" +
      "</block>" +
      '<block type="controls_if">' +
      '<mutation else="1"></mutation>' +
      '<value name="IF0">' +
      "<block " +
      'movable="false" ' +
      'type="obstacle2">' +
      "</block>" +
      "</value>" +
      //'<value name="DO0">'+
      //'<block '+
      //'movable="false" '+
      //'type="jump">'+
      //'</block>'+
      //'</value>'+
      //'<value name="ELSE">'+
      //'<block '+
      //'movable="false" '+
      //'type="walk">'+
      //'</block>'+
      //'</value>'+

      "</block>" +
      "<block " +
      'type="jump">' +
      "</block>" +
      "<block " +
      'type="walk">' +
      "</block>" +
      "</xml>"
  );

  $("#tipModal1 .modal-body").html(
    "<h3>To write the best code, you should solve the problem using 5 or less blocks. If you can't do it the first time, just come back later and try again.</h3>"
  );

  $("#tipModal2 .modal-body").html(
    '<h3>If the bogo sees an orange rectangle "Jump". If the bogo sees a path "Walk".</h3>'
  );

  $("#tipModal3 .modal-body").html(
    //'<h3>Try using the "If-Else" block with "Jump" block inside to avoid the orange rectangle.</h3>'+
    '<h3>Connect the visual blocks in the right way to get the bogo moving inside the "Repeat Until" loop.</h3>' +
      '<div class="row">' +
      '<div class="col-xs-5">' +
      '<img src="../images/repeat_until_target2.png">' +
      "</div>" +
      '<div class="col-xs-7">' +
      '<h3>Repeat the blocks in this "Repeat Until" until the bogo reaches the green circle. ' +
      'The "repeat until" block is useful when you want to run the same code again and again until the goal is reached. ' +
      'In this case the goal is the green circle. You can connect the "Walk" and "Jump" blocks inside it.</h3>' +
      "</div>" +
      "</div>" +
      '<div class="row">' +
      '<div class="col-xs-5">' +
      '<img src="../images/if_obstacle_then_else.png">' +
      "</div>" +
      '<div class="col-xs-7">' +
      '<h3>If the bogo sees an orange rectangle ahead, run the blocks in the first "If" section. Otherwise, run the blocks in the second "Else" section.</h3>' +
      "</div>" +
      "</div>" +
      '<div class="row">' +
      '<div class="col-xs-3">' +
      '<img src="../images/walk.png">' +
      "</div>" +
      '<div class="col-xs-9">' +
      "<h3>Each Walk block moves the bogo one step forward to the next space on the path.</h3>" +
      "</div>" +
      "</div>" +
      '<div class="row">' +
      '<div class="col-xs-3">' +
      '<img src="../images/jump.png">' +
      "</div>" +
      '<div class="col-xs-9">' +
      "<h3>Each Jump block makes the bogo jump over the orange rectangle and moves him two steps forward.</h3>" +
      "</div>" +
      "</div>"
  );

  $("button#newBlockTip").show();
  $("#newBlockModal .modal-body").html(
    '<div class="row">' +
      '<div class="col-xs-5">' +
      '<img src="../images/repeat_until_target2.png">' +
      "</div>" +
      '<div class="col-xs-7">' +
      '<h3>Repeat the blocks in this "Repeat Until" until the bogo reaches the green circle. ' +
      'The "repeat until" block is useful when you want to run the same code again and again until the goal is reached. ' +
      'In this case the goal is the green circle. You can connect the "Walk" and "Jump" blocks inside it.</h3>' +
      "</div>" +
      "</div>"
  );

  //Insert Start block in workspace
  InsertBlock("start", 200, 50, false, true);

  redraw();
}

function LoadLevel31() {
  if (currentLevel != 31) {
    $("#instructionsModal .modal-body").html(
      "<h3>Reach the green circle.</h3>"
    );
    $("#instructionsModal").modal("show");
    currentLevel = 31;
    tipToShow = 1;
    totalNumTips = 3;
    numSteps = 9;
  }

  player = new Player();
  //player.init_x = 100;
  //player.init_y = 200;

  player.x = player.init_x;
  player.y = player.init_y;

  target = new Target();
  target.y = player.y + player.diameter * 0;
  target.x = player.x + player.diameter * 9; //Position target one steps away from player
  target.color = color(51, 153, 0);

  obstacles = [
    new Obstacle(player.x + player.diameter * 2, player.y),
    new Obstacle(player.x + player.diameter * 4, player.y),
    new Obstacle(player.x + player.diameter * 7, player.y),
  ];

  Blockly.updateToolbox(
    '<xml id="toolbox" style="display: none">' +
      '<block type="controls_whileUntil">' +
      '<field name="MODE">UNTIL</field>' +
      '<value name="BOOL">' +
      "<block " +
      'movable="false" ' +
      'type="target2">' +
      "</block>" +
      "</value>" +
      "</block>" +
      '<block type="controls_if">' +
      '<mutation else="1"></mutation>' +
      '<value name="IF0">' +
      "<block " +
      'movable="false" ' +
      'type="obstacle2">' +
      "</block>" +
      "</value>" +
      //'<value name="DO0">'+
      //'<block '+
      //'movable="false" '+
      //'type="jump">'+
      //'</block>'+
      //'</value>'+
      //'<value name="ELSE">'+
      //'<block '+
      //'movable="false" '+
      //'type="walk">'+
      //'</block>'+
      //'</value>'+

      "</block>" +
      "<block " +
      'type="jump">' +
      "</block>" +
      "<block " +
      'type="walk">' +
      "</block>" +
      "</xml>"
  );

  $("#tipModal1 .modal-body").html(
    "<h3>To write the best code, you should solve the problem using 5 or less blocks. If you can't do it the first time, just come back later and try again.</h3>"
  );

  $("#tipModal2 .modal-body").html(
    '<h3>If the bogo sees an orange rectangle "Jump". If the bogo sees a path "Walk".</h3>'
  );

  $("#tipModal3 .modal-body").html(
    //'<h3>Try using the "If-Else" block with "Jump" block inside to avoid the orange rectangle.</h3>'+
    '<h3>Connect the visual blocks in the right way to get the bogo moving inside the "Repeat Until" loop.</h3>' +
      '<div class="row">' +
      '<div class="col-xs-5">' +
      '<img src="../images/repeat_until_target2.png">' +
      "</div>" +
      '<div class="col-xs-7">' +
      '<h3>Repeat the blocks in this "Repeat Until" until the bogo reaches the green circle. ' +
      'The "repeat until" block is useful when you want to run the same code again and again until the goal is reached. ' +
      'In this case the goal is the green circle. You can connect the "Walk" and "Jump" blocks inside it.</h3>' +
      "</div>" +
      "</div>" +
      '<div class="row">' +
      '<div class="col-xs-5">' +
      '<img src="../images/if_obstacle_then_else.png">' +
      "</div>" +
      '<div class="col-xs-7">' +
      '<h3>If the bogo sees an orange rectangle ahead, run the blocks in the first "If" section. Otherwise, run the blocks in the second "Else" section.</h3>' +
      "</div>" +
      "</div>" +
      '<div class="row">' +
      '<div class="col-xs-3">' +
      '<img src="../images/walk.png">' +
      "</div>" +
      '<div class="col-xs-9">' +
      "<h3>Each Walk block moves the bogo one step forward to the next space on the path.</h3>" +
      "</div>" +
      "</div>" +
      '<div class="row">' +
      '<div class="col-xs-3">' +
      '<img src="../images/jump.png">' +
      "</div>" +
      '<div class="col-xs-9">' +
      "<h3>Each Jump block makes the bogo jump over the orange rectangle and moves him two steps forward.</h3>" +
      "</div>" +
      "</div>"
  );

  $("button#newBlockTip").hide();
  //$("#newBlockModal .modal-body").html(
  //  '<div class="row">'+
  //  '<div class="col-xs-5">'+
  //  '<img src="../images/repeat_until_target2.png">'+
  //  '</div>'+
  //  '<div class="col-xs-7">'+
  //  '<h3>Repeat the blocks in this "Repeat Until" until the bogo reaches the green circle. ' +
  //  'The "repeat until" block is useful when you want to run the same code again and again until the goal is reached. ' +
  //  'In this case the goal is the green circle. You can connect the "Walk" and "Jump" blocks inside it.</h3>'+
  //  '</div>'+
  //  '</div>'
  //);

  //Insert Start block in workspace
  InsertBlock("start", 200, 50, false, true);

  redraw();
}

function LoadLevel32() {
  if (currentLevel != 32) {
    $("#instructionsModal .modal-body").html(
      "<h3>Reach the green circle.</h3>"
    );
    $("#instructionsModal").modal("show");
    currentLevel = 32;
    tipToShow = 1;
    totalNumTips = 2;
    numSteps = 9;
  }

  player = new Player();
  //player.init_x = 100;
  //player.init_y = 200;

  player.x = player.init_x;
  player.y = player.init_y;

  target = new Target();
  target.y = player.y + player.diameter * 0;
  target.x = player.x + player.diameter * 9; //Position target one steps away from player
  target.color = color(51, 153, 0);

  obstacles = [
    new Obstacle(player.x + player.diameter * 2, player.y),
    new Obstacle(player.x + player.diameter * 4, player.y),
    new Obstacle(player.x + player.diameter * 7, player.y),
  ];

  Blockly.updateToolbox(
    '<xml id="toolbox" style="display: none">' +
      '<block type="controls_whileUntil">' +
      '<field name="MODE">UNTIL</field>' +
      '<value name="BOOL">' +
      "<block " +
      'movable="false" ' +
      'type="target2">' +
      "</block>" +
      "</value>" +
      "</block>" +
      '<block type="controls_if">' +
      '<mutation else="1"></mutation>' +
      '<value name="IF0">' +
      "<block " +
      'movable="false" ' +
      'type="logic_negate">' +
      '<value name="BOOL">' +
      "<block " +
      'movable="false" ' +
      //'deletable="false" ' +
      'type="obstacle2">' +
      "</block>" +
      "</value>" +
      "</block>" +
      "</value>" +
      "</block>" +
      "<block " +
      'type="jump">' +
      "</block>" +
      "<block " +
      'type="walk">' +
      "</block>" +
      "</xml>"
  );

  $("#tipModal1 .modal-body").html(
    "<h3>To write the best code, you should solve the problem using 5 or less blocks. If you can't do it the first time, just come back later and try again.</h3>"
  );

  //$("#tipModal2 .modal-body").html(
  //  '<h3>If the bogo sees an orange rectangle "Jump". If the bogo sees a path "Walk".</h3>'
  //);

  $("#tipModal2 .modal-body").html(
    //'<h3>Try using the "If-Else" block with "Jump" block inside to avoid the orange rectangle.</h3>'+
    '<h3>Connect the visual blocks in the right way to get the bogo moving inside the "Repeat Until" loop.</h3>' +
      '<div class="row">' +
      '<div class="col-xs-5">' +
      '<img src="../images/repeat_until_target2.png">' +
      "</div>" +
      '<div class="col-xs-7">' +
      '<h3>Repeat the blocks in this "Repeat Until" until the bogo reaches the green circle. ' +
      'The "repeat until" block is useful when you want to run the same code again and again until the goal is reached. ' +
      'In this case the goal is the green circle. You can connect the "Walk" and "Jump" blocks inside it.</h3>' +
      "</div>" +
      "</div>" +
      '<div class="row">' +
      '<div class="col-xs-5">' +
      '<img src="../images/not_obstacle2.png">' +
      "</div>" +
      '<div class="col-xs-7">' +
      '<h3>The "not" block is an expression that returns true or false. ' +
      "In this case it returns false if there is an orange rectangle in front.</h3>" +
      "</div>" +
      "</div>" +
      '<div class="row">' +
      '<div class="col-xs-5">' +
      '<img src="../images/if_obstacle_then_else.png">' +
      "</div>" +
      '<div class="col-xs-7">' +
      '<h3>If the bogo sees an orange rectangle ahead, run the blocks in the first "If" section. Otherwise, run the blocks in the second "Else" section.</h3>' +
      "</div>" +
      "</div>" +
      '<div class="row">' +
      '<div class="col-xs-3">' +
      '<img src="../images/walk.png">' +
      "</div>" +
      '<div class="col-xs-9">' +
      "<h3>Each Walk block moves the bogo one step forward to the next space on the path.</h3>" +
      "</div>" +
      "</div>" +
      '<div class="row">' +
      '<div class="col-xs-3">' +
      '<img src="../images/jump.png">' +
      "</div>" +
      '<div class="col-xs-9">' +
      "<h3>Each Jump block makes the bogo jump over the orange rectangle and moves him two steps forward.</h3>" +
      "</div>" +
      "</div>"
  );

  $("button#newBlockTip").show();
  $("#newBlockModal .modal-body").html(
    '<div class="row">' +
      '<div class="col-xs-5">' +
      '<img src="../images/not_obstacle2.png">' +
      "</div>" +
      '<div class="col-xs-7">' +
      '<h3>The "not" block is an expression that returns true or false. ' +
      "In this case it returns false if there is an orange rectangle in front.</h3>" +
      "</div>" +
      "</div>"
  );

  //Insert Start block in workspace
  InsertBlock("start", 200, 50, false, true);

  redraw();
}

function LoadLevel33() {
  if (currentLevel != 33) {
    $("#instructionsModal .modal-body").html(
      "<h3>Reach the green circle, but do a long jump if there are double orange rectangles.</h3>"
    );
    $("#instructionsModal").modal("show");
    currentLevel = 33;
    tipToShow = 1;
    totalNumTips = 3;
    numSteps = 5;
  }

  player = new Player();
  //player.init_x = 100;
  //player.init_y = 200;

  player.x = player.init_x;
  player.y = player.init_y;

  target = new Target();
  target.y = player.y + player.diameter * 0;
  target.x = player.x + player.diameter * 5; //Position target one steps away from player
  target.color = color(51, 153, 0);

  obstacles = [
    new Obstacle(player.x + player.diameter * 2, player.y),
    new Obstacle(player.x + player.diameter * 3, player.y),
  ];

  Blockly.updateToolbox(
    '<xml id="toolbox" style="display: none">' +
      //'<block type="controls_whileUntil">'+
      //'<field name="MODE">UNTIL</field>'+
      //'<value name="BOOL">' +
      //'<block ' +
      //'movable="false" ' +
      //'type="target2">' +
      //'</block>'+
      //'</value>'+
      //'</block>'+

      '<block type="controls_if">' +
      //'<mutation else="1"></mutation>' +
      '<value name="IF0">' +
      "<block " +
      'movable="false" ' +
      //'deletable="false" ' +
      'type="obstacle3">' +
      "</block>" +
      "</value>" +
      '<value name="DO0">' +
      "<block " +
      'movable="false" ' +
      //'deletable="false" ' +
      'type="long_jump">' +
      "</block>" +
      "</value>" +
      "</block>" +
      //'<block ' +
      //'type="jump">' +
      //'</block>'+

      "<block " +
      'type="walk">' +
      "</block>" +
      "</xml>"
  );

  $("#tipModal1 .modal-body").html(
    "<h3>To write the best code, you should solve the problem using 5 or less blocks. If you can't do it the first time, just come back later and try again.</h3>"
  );

  $("#tipModal2 .modal-body").html(
    '<h3>Try using the "If" block with "Long Jump" block inside to avoid the double orange rectangles.</h3>'
  );

  $("#tipModal3 .modal-body").html(
    "<h3>You need to program the bogo to reach the green circle." +
      "Connect the visual blocks in the right way to get the bogo moving." +
      'Try using the "If" block with "Long Jump" block.' +
      "</h3>" +
      //'<h3>Connect the visual blocks in the right way to get the bogo moving inside the "Repeat Until" loop.</h3>'+
      '<div class="row">' +
      '<div class="col-xs-3">' +
      '<img src="../images/start.png">' +
      "</div>" +
      '<div class="col-xs-9">' +
      "<h3>This is the first block of your program. Add blocks under this one.</h3>" +
      "</div>" +
      "</div>" +
      '<div class="row">' +
      '<div class="col-xs-5">' +
      '<img src="../images/if_double_obstacle_then.png">' +
      "</div>" +
      '<div class="col-xs-7">' +
      '<h3>Walk the blocks in this "If" only if the bogo sees double orange rectangles ahead.</h3>' +
      "</div>" +
      "</div>" +
      '<div class="row">' +
      '<div class="col-xs-3">' +
      '<img src="../images/walk.png">' +
      "</div>" +
      '<div class="col-xs-9">' +
      "<h3>Each Walk block moves the bogo one step forward to the next space on the path.</h3>" +
      "</div>" +
      "</div>" +
      '<div class="row">' +
      '<div class="col-xs-3">' +
      '<img src="../images/long_jump.png">' +
      "</div>" +
      '<div class="col-xs-9">' +
      "<h3>Each Long Jump block makes the bogo jump over the double orange rectangles and moves him three steps forward.</h3>" +
      "</div>" +
      "</div>"
  );

  $("button#newBlockTip").show();
  $("#newBlockModal .modal-body").html(
    '<div class="row">' +
      '<div class="col-xs-5">' +
      '<img src="../images/if_double_obstacle_then_long_jump.png">' +
      "</div>" +
      '<div class="col-xs-7">' +
      '<h3>The "Long Jump" block will make the bogo jump 3 spaces.</h3>' +
      "</div>" +
      "</div>"
  );

  //Insert Start block in workspace
  InsertBlock("start", 200, 50, false, true);

  redraw();
}

function LoadLevel34() {
  if (currentLevel != 34) {
    $("#instructionsModal .modal-body").html(
      "<h3>Reach the green circle, but do a super jump if there are stacked orange rectangles.</h3>"
    );
    $("#instructionsModal").modal("show");
    currentLevel = 34;
    tipToShow = 1;
    totalNumTips = 2;
    numSteps = 5;
  }

  player = new Player();
  //player.init_x = 100;
  //player.init_y = 200;

  player.x = player.init_x;
  player.y = player.init_y;

  target = new Target();
  target.y = player.y + player.diameter * 0;
  target.x = player.x + player.diameter * 5; //Position target one steps away from player
  target.color = color(51, 153, 0);

  obstacles = [
    new Obstacle(player.x + player.diameter * 2, player.y),
    new Obstacle(player.x + player.diameter * 2, player.y - player.diameter),
  ];

  Blockly.updateToolbox(
    '<xml id="toolbox" style="display: none">' +
      //'<block type="controls_whileUntil">'+
      //'<field name="MODE">UNTIL</field>'+
      //'<value name="BOOL">' +
      //'<block ' +
      //'movable="false" ' +
      //'type="target2">' +
      //'</block>'+
      //'</value>'+
      //'</block>'+

      '<block type="controls_if">' +
      //'<mutation else="1"></mutation>' +
      '<value name="IF0">' +
      "<block " +
      'movable="false" ' +
      //'deletable="false" ' +
      'type="obstacle4">' +
      "</block>" +
      "</value>" +
      '<value name="DO0">' +
      "<block " +
      'movable="false" ' +
      //'deletable="false" ' +
      'type="super_jump">' +
      "</block>" +
      "</value>" +
      "</block>" +
      //'<block ' +
      //'type="jump">' +
      //'</block>'+

      "<block " +
      'type="walk">' +
      "</block>" +
      "</xml>"
  );

  $("#tipModal1 .modal-body").html(
    "<h3>To write the best code, you should solve the problem using 6 or less blocks. If you can't do it the first time, just come back later and try again.</h3>"
  );

  //$("#tipModal2 .modal-body").html(
  //  '<h3>Try using the "If" block with "Long Jump" block inside to avoid the double orange rectangles.</h3>'
  //);

  $("#tipModal2 .modal-body").html(
    "<h3>You need to program the bogo to reach the green circle." +
      "Connect the visual blocks in the right way to get the bogo moving." +
      'Try using the "If" block with "Super Jump" block.' +
      "</h3>" +
      //'<h3>Connect the visual blocks in the right way to get the bogo moving inside the "Repeat Until" loop.</h3>'+
      '<div class="row">' +
      '<div class="col-xs-3">' +
      '<img src="../images/start.png">' +
      "</div>" +
      '<div class="col-xs-9">' +
      "<h3>This is the first block of your program. Add blocks under this one.</h3>" +
      "</div>" +
      "</div>" +
      '<div class="row">' +
      '<div class="col-xs-5">' +
      '<img src="../images/if_stacked_obstacles_then.png">' +
      "</div>" +
      '<div class="col-xs-7">' +
      '<h3>Walk the blocks in this "If" only if the bogo sees double orange rectangles ahead.</h3>' +
      "</div>" +
      "</div>" +
      '<div class="row">' +
      '<div class="col-xs-3">' +
      '<img src="../images/walk.png">' +
      "</div>" +
      '<div class="col-xs-9">' +
      "<h3>Each Walk block moves the bogo one step forward to the next space on the path.</h3>" +
      "</div>" +
      "</div>" +
      '<div class="row">' +
      '<div class="col-xs-3">' +
      '<img src="../images/long_jump.png">' +
      "</div>" +
      '<div class="col-xs-9">' +
      "<h3>Each Long Jump block makes the bogo jump over the double orange rectangles and moves him three steps forward.</h3>" +
      "</div>" +
      "</div>"
  );

  $("button#newBlockTip").show();
  $("#newBlockModal .modal-body").html(
    '<div class="row">' +
      '<div class="col-xs-5">' +
      '<img src="../images/if_stacked_obstacles_then_super_jump.png">' +
      "</div>" +
      '<div class="col-xs-7">' +
      '<h3>The "Super Jump" block will make the bogo jump high over stacked orange rectangles.</h3>' +
      "</div>" +
      "</div>"
  );

  //Insert Start block in workspace
  InsertBlock("start", 200, 50, false, true);

  redraw();
}

function LoadLevel35() {
  if (currentLevel != 35) {
    $("#instructionsModal .modal-body").html(
      "<h3>Reach the green circle, but do a long jump if there are double orange rectangles.</h3>"
    );
    $("#instructionsModal").modal("show");
    currentLevel = 35;
    tipToShow = 1;
    totalNumTips = 3;
    numSteps = 9;
  }

  player = new Player();
  //player.init_x = 100;
  //player.init_y = 200;

  player.x = player.init_x;
  player.y = player.init_y;

  target = new Target();
  target.y = player.y + player.diameter * 0;
  target.x = player.x + player.diameter * 9; //Position target one steps away from player
  target.color = color(51, 153, 0);

  obstacles = [
    new Obstacle(player.x + player.diameter * 2, player.y),
    new Obstacle(player.x + player.diameter * 3, player.y),
    new Obstacle(player.x + player.diameter * 6, player.y),
    new Obstacle(player.x + player.diameter * 7, player.y),
  ];

  Blockly.updateToolbox(
    '<xml id="toolbox" style="display: none">' +
      '<block type="controls_whileUntil">' +
      '<field name="MODE">UNTIL</field>' +
      '<value name="BOOL">' +
      "<block " +
      'movable="false" ' +
      'type="target2">' +
      "</block>" +
      "</value>" +
      "</block>" +
      '<block type="controls_if">' +
      '<mutation else="1"></mutation>' +
      '<value name="IF0">' +
      "<block " +
      'movable="false" ' +
      //'deletable="false" ' +
      'type="obstacle3">' +
      "</block>" +
      "</value>" +
      '<value name="DO0">' +
      "<block " +
      'movable="false" ' +
      //'deletable="false" ' +
      'type="long_jump">' +
      "</block>" +
      "</value>" +
      "</block>" +
      //'<block ' +
      //'type="jump">' +
      //'</block>'+

      "<block " +
      'type="walk">' +
      "</block>" +
      "</xml>"
  );

  $("#tipModal1 .modal-body").html(
    "<h3>To write the best code, you should solve the problem using 5 or less blocks. If you can't do it the first time, just come back later and try again.</h3>"
  );

  $("#tipModal2 .modal-body").html(
    '<h3>Try using the "If" block with "Long Jump" block inside to avoid the double orange rectangles.</h3>'
  );

  $("#tipModal3 .modal-body").html(
    "<h3>You need to program the bogo to reach the green circle." +
      "Connect the visual blocks in the right way to get the bogo moving." +
      'Try using the "If" block with "Long Jump" block.' +
      "</h3>" +
      //'<h3>Connect the visual blocks in the right way to get the bogo moving inside the "Repeat Until" loop.</h3>'+
      '<div class="row">' +
      '<div class="col-xs-3">' +
      '<img src="../images/start.png">' +
      "</div>" +
      '<div class="col-xs-9">' +
      "<h3>This is the first block of your program. Add blocks under this one.</h3>" +
      "</div>" +
      "</div>" +
      '<div class="row">' +
      '<div class="col-xs-5">' +
      '<img src="../images/repeat_until_target2.png">' +
      "</div>" +
      '<div class="col-xs-7">' +
      '<h3>Repeat the blocks in this "Repeat Until" until the bogo reaches the green circle. ' +
      'The "repeat until" block is useful when you want to run the same code again and again until the goal is reached. ' +
      'In this case the goal is the green circle. You can connect the "Walk" and "Long Jump" blocks inside it.</h3>' +
      "</div>" +
      "</div>" +
      '<div class="row">' +
      '<div class="col-xs-5">' +
      '<img src="../images/if_double_obstacle_then_else.png">' +
      "</div>" +
      '<div class="col-xs-7">' +
      '<h3>Walk the blocks in this "If" only if the bogo sees double orange rectangles ahead. ' +
      'Otherwise, run the blocks in the second "Else" section.</h3>' +
      "</div>" +
      "</div>" +
      '<div class="row">' +
      '<div class="col-xs-3">' +
      '<img src="../images/walk.png">' +
      "</div>" +
      '<div class="col-xs-9">' +
      "<h3>Each Walk block moves the bogo one step forward to the next space on the path.</h3>" +
      "</div>" +
      "</div>" +
      '<div class="row">' +
      '<div class="col-xs-3">' +
      '<img src="../images/long_jump.png">' +
      "</div>" +
      '<div class="col-xs-9">' +
      "<h3>Each Long Jump block makes the bogo jump over the double orange rectangles and moves him three steps forward.</h3>" +
      "</div>" +
      "</div>"
  );

  $("button#newBlockTip").hide();
  //$("#newBlockModal .modal-body").html(
  //  '<div class="row">'+
  //  '<div class="col-xs-5">'+
  //  '<img src="../images/if_double_obstacle_then_long_jump.png">'+
  //  '</div>'+
  //  '<div class="col-xs-7">'+
  //  '<h3>The "Long Jump" block will make the bogo jump 3 spaces.</h3>'+
  //  '</div>'+
  //  '</div>'
  //);

  //Insert Start block in workspace
  InsertBlock("start", 200, 50, false, true);

  redraw();
}

function LoadLevel36() {
  if (currentLevel != 36) {
    $("#instructionsModal .modal-body").html(
      "<h3>Reach the green circle, but do a super jump if there are stacked orange rectangles.</h3>"
    );
    $("#instructionsModal").modal("show");
    currentLevel = 36;
    tipToShow = 1;
    totalNumTips = 1;
    numSteps = 9;
  }

  player = new Player();
  //player.init_x = 100;
  //player.init_y = 200;

  player.x = player.init_x;
  player.y = player.init_y;

  target = new Target();
  target.y = player.y + player.diameter * 0;
  target.x = player.x + player.diameter * 9; //Position target one steps away from player
  target.color = color(51, 153, 0);

  obstacles = [
    new Obstacle(player.x + player.diameter * 2, player.y),
    new Obstacle(player.x + player.diameter * 2, player.y - player.diameter),
    new Obstacle(player.x + player.diameter * 4, player.y),
    new Obstacle(player.x + player.diameter * 4, player.y - player.diameter),
    new Obstacle(player.x + player.diameter * 7, player.y),
    new Obstacle(player.x + player.diameter * 7, player.y - player.diameter),
  ];

  Blockly.updateToolbox(
    '<xml id="toolbox" style="display: none">' +
      '<block type="controls_whileUntil">' +
      '<field name="MODE">UNTIL</field>' +
      '<value name="BOOL">' +
      "<block " +
      'movable="false" ' +
      'type="target2">' +
      "</block>" +
      "</value>" +
      "</block>" +
      '<block type="controls_if">' +
      '<mutation else="1"></mutation>' +
      '<value name="IF0">' +
      "<block " +
      'movable="false" ' +
      //'deletable="false" ' +
      'type="obstacle4">' +
      "</block>" +
      "</value>" +
      '<value name="DO0">' +
      "<block " +
      'movable="false" ' +
      //'deletable="false" ' +
      'type="super_jump">' +
      "</block>" +
      "</value>" +
      "</block>" +
      //'<block ' +
      //'type="jump">' +
      //'</block>'+

      "<block " +
      'type="walk">' +
      "</block>" +
      "</xml>"
  );

  $("#tipModal1 .modal-body").html(
    "<h3>To write the best code, you should solve the problem using 5 or less blocks. If you can't do it the first time, just come back later and try again.</h3>"
  );

  //$("#tipModal2 .modal-body").html(
  //  '<h3>Try using the "If" block with "Long Jump" block inside to avoid the double orange rectangles.</h3>'
  //);

  $("#tipModal2 .modal-body").html(
    "<h3>You need to program the bogo to reach the green circle." +
      "Connect the visual blocks in the right way to get the bogo moving." +
      'Try using the "If" block with "Super Jump" block.' +
      "</h3>" +
      //'<h3>Connect the visual blocks in the right way to get the bogo moving inside the "Repeat Until" loop.</h3>'+
      '<div class="row">' +
      '<div class="col-xs-3">' +
      '<img src="../images/start.png">' +
      "</div>" +
      '<div class="col-xs-9">' +
      "<h3>This is the first block of your program. Add blocks under this one.</h3>" +
      "</div>" +
      "</div>" +
      '<div class="row">' +
      '<div class="col-xs-5">' +
      '<img src="../images/if_stacked_obstacles_then.png">' +
      "</div>" +
      '<div class="col-xs-7">' +
      '<h3>Walk the blocks in this "If" only if the bogo sees double orange rectangles ahead.</h3>' +
      "</div>" +
      "</div>" +
      '<div class="row">' +
      '<div class="col-xs-3">' +
      '<img src="../images/walk.png">' +
      "</div>" +
      '<div class="col-xs-9">' +
      "<h3>Each Walk block moves the bogo one step forward to the next space on the path.</h3>" +
      "</div>" +
      "</div>" +
      '<div class="row">' +
      '<div class="col-xs-3">' +
      '<img src="../images/jump.png">' +
      "</div>" +
      '<div class="col-xs-9">' +
      "<h3>Each Jump block makes the bogo jump over the orange rectangle and moves him two steps forward.</h3>" +
      "</div>" +
      "</div>"
  );

  $("button#newBlockTip").hide();
  //$("#newBlockModal .modal-body").html(
  //  '<div class="row">'+
  //  '<div class="col-xs-5">'+
  //  '<img src="../images/if_stacked_obstacles_then_super_jump.png">'+
  //  '</div>'+
  //  '<div class="col-xs-7">'+
  //  '<h3>The "Super Jump" block will make the bogo jump high over stacked orange rectangles.</h3>'+
  //  '</div>'+
  //  '</div>'
  //);

  //Insert Start block in workspace
  InsertBlock("start", 200, 50, false, true);

  redraw();
}

function LoadLevel37() {
  if (currentLevel != 37) {
    $("#instructionsModal .modal-body").html(
      "<h3>Reach the green circle, but do a long jump if there are double orange rectangles.</h3>"
    );
    $("#instructionsModal").modal("show");
    currentLevel = 37;
    tipToShow = 1;
    totalNumTips = 3;
    numSteps = 7;
  }

  player = new Player();
  //player.init_x = 100;
  //player.init_y = 200;

  player.x = player.init_x;
  player.y = player.init_y;

  target = new Target();
  target.y = player.y + player.diameter * 0;
  target.x = player.x + player.diameter * 7; //Position target one steps away from player
  target.color = color(51, 153, 0);

  obstacles = [
    new Obstacle(player.x + player.diameter * 2, player.y),
    new Obstacle(player.x + player.diameter * 4, player.y),
    new Obstacle(player.x + player.diameter * 5, player.y),
  ];

  Blockly.updateToolbox(
    '<xml id="toolbox" style="display: none">' +
      //'<block type="controls_whileUntil">'+
      //'<field name="MODE">UNTIL</field>'+
      //'<value name="BOOL">' +
      //'<block ' +
      //'movable="false" ' +
      //'type="target2">' +
      //'</block>'+
      //'</value>'+
      //'</block>'+

      '<block type="controls_if">' +
      //'<mutation else="1"></mutation>' +
      '<value name="IF0">' +
      "<block " +
      'movable="false" ' +
      //'deletable="false" ' +
      'type="obstacle2">' +
      "</block>" +
      "</value>" +
      '<value name="DO0">' +
      "<block " +
      'movable="false" ' +
      //'deletable="false" ' +
      'type="jump">' +
      "</block>" +
      "</value>" +
      "</block>" +
      '<block type="controls_if">' +
      //'<mutation else="1"></mutation>' +
      '<value name="IF0">' +
      "<block " +
      'movable="false" ' +
      //'deletable="false" ' +
      'type="obstacle3">' +
      "</block>" +
      "</value>" +
      '<value name="DO0">' +
      "<block " +
      'movable="false" ' +
      //'deletable="false" ' +
      'type="long_jump">' +
      "</block>" +
      "</value>" +
      "</block>" +
      //'<block ' +
      //'type="jump">' +
      //'</block>'+

      "<block " +
      'type="walk">' +
      "</block>" +
      "</xml>"
  );

  $("#tipModal1 .modal-body").html(
    "<h3>To write the best code, you should solve the problem using 7 or less blocks. If you can't do it the first time, just come back later and try again.</h3>"
  );

  $("#tipModal2 .modal-body").html(
    '<h3>Try using the "If" block with "Long Jump" or "Jump" block to avoid the orange rectangles.</h3>'
  );

  $("#tipModal3 .modal-body").html(
    "<h3>You need to program the bogo to reach the green circle." +
      "Connect the visual blocks in the right way to get the bogo moving." +
      'Try using the "If" block with "Long Jump" or "Jump" block.' +
      "</h3>" +
      //'<h3>Connect the visual blocks in the right way to get the bogo moving inside the "Repeat Until" loop.</h3>'+
      '<div class="row">' +
      '<div class="col-xs-3">' +
      '<img src="../images/start.png">' +
      "</div>" +
      '<div class="col-xs-9">' +
      "<h3>This is the first block of your program. Add blocks under this one.</h3>" +
      "</div>" +
      "</div>" +
      '<div class="row">' +
      '<div class="col-xs-5">' +
      '<img src="../images/if_obstacle_then.png">' +
      "</div>" +
      '<div class="col-xs-7">' +
      '<h3>Walk the blocks in this "If" only if the bogo sees an orange rectangle ahead.</h3>' +
      "</div>" +
      "</div>" +
      '<div class="row">' +
      '<div class="col-xs-5">' +
      '<img src="../images/if_double_obstacle_then.png">' +
      "</div>" +
      '<div class="col-xs-7">' +
      '<h3>Walk the blocks in this "If" only if the bogo sees double orange rectangles ahead.</h3>' +
      "</div>" +
      "</div>" +
      '<div class="row">' +
      '<div class="col-xs-3">' +
      '<img src="../images/walk.png">' +
      "</div>" +
      '<div class="col-xs-9">' +
      "<h3>Each Walk block moves the bogo one step forward to the next space on the path.</h3>" +
      "</div>" +
      "</div>" +
      '<div class="row">' +
      '<div class="col-xs-3">' +
      '<img src="../images/jump.png">' +
      "</div>" +
      '<div class="col-xs-9">' +
      "<h3>Each Jump block moves the bogo jump over the orange rectangle and moves it two steps forward.</h3>" +
      "</div>" +
      "</div>" +
      '<div class="row">' +
      '<div class="col-xs-3">' +
      '<img src="../images/long_jump.png">' +
      "</div>" +
      '<div class="col-xs-9">' +
      "<h3>Each Long Jump block makes the bogo jump over the double orange rectangles and moves him three steps forward.</h3>" +
      "</div>" +
      "</div>"
  );

  $("button#newBlockTip").hide();
  //$("#newBlockModal .modal-body").html(
  //  '<div class="row">'+
  //  '<div class="col-xs-5">'+
  //  '<img src="../images/if_double_obstacle_then_long_jump.png">'+
  //  '</div>'+
  //  '<div class="col-xs-7">'+
  //  '<h3>The "Long Jump" block will make the bogo jump 3 spaces.</h3>'+
  //  '</div>'+
  //  '</div>'
  //);

  //Insert Start block in workspace
  InsertBlock("start", 200, 50, false, true);

  redraw();
}

function LoadLevel38() {
  if (currentLevel != 38) {
    $("#instructionsModal .modal-body").html(
      "<h3>Reach the green circle, but do a super jump if there are stacked orange rectangles.</h3>"
    );
    $("#instructionsModal").modal("show");
    currentLevel = 38;
    tipToShow = 1;
    totalNumTips = 3;
    numSteps = 6;
  }

  player = new Player();
  //player.init_x = 100;
  //player.init_y = 200;

  player.x = player.init_x;
  player.y = player.init_y;

  target = new Target();
  target.y = player.y + player.diameter * 0;
  target.x = player.x + player.diameter * 6; //Position target one steps away from player
  target.color = color(51, 153, 0);

  obstacles = [
    new Obstacle(player.x + player.diameter * 2, player.y),
    new Obstacle(player.x + player.diameter * 4, player.y),
    new Obstacle(player.x + player.diameter * 4, player.y - player.diameter),
  ];

  Blockly.updateToolbox(
    '<xml id="toolbox" style="display: none">' +
      //'<block type="controls_whileUntil">'+
      //'<field name="MODE">UNTIL</field>'+
      //'<value name="BOOL">' +
      //'<block ' +
      //'movable="false" ' +
      //'type="target2">' +
      //'</block>'+
      //'</value>'+
      //'</block>'+

      '<block type="controls_if">' +
      //'<mutation else="1"></mutation>' +
      '<value name="IF0">' +
      "<block " +
      'movable="false" ' +
      //'deletable="false" ' +
      'type="obstacle2">' +
      "</block>" +
      "</value>" +
      '<value name="DO0">' +
      "<block " +
      'movable="false" ' +
      //'deletable="false" ' +
      'type="jump">' +
      "</block>" +
      "</value>" +
      "</block>" +
      '<block type="controls_if">' +
      //'<mutation else="1"></mutation>' +
      '<value name="IF0">' +
      "<block " +
      'movable="false" ' +
      //'deletable="false" ' +
      'type="obstacle4">' +
      "</block>" +
      "</value>" +
      '<value name="DO0">' +
      "<block " +
      'movable="false" ' +
      //'deletable="false" ' +
      'type="super_jump">' +
      "</block>" +
      "</value>" +
      "</block>" +
      //'<block ' +
      //'type="jump">' +
      //'</block>'+

      "<block " +
      'type="walk">' +
      "</block>" +
      "</xml>"
  );

  $("#tipModal1 .modal-body").html(
    "<h3>To write the best code, you should solve the problem using 7 or less blocks. If you can't do it the first time, just come back later and try again.</h3>"
  );

  $("#tipModal2 .modal-body").html(
    '<h3>Try using the "If" block with "Super Jump" or "Jump" block to avoid the orange rectangles.</h3>'
  );

  $("#tipModal3 .modal-body").html(
    "<h3>You need to program the bogo to reach the green circle." +
      "Connect the visual blocks in the right way to get the bogo moving." +
      'Try using the "If" block with "Super Jump" or "Jump" block.' +
      "</h3>" +
      //'<h3>Connect the visual blocks in the right way to get the bogo moving inside the "Repeat Until" loop.</h3>'+
      '<div class="row">' +
      '<div class="col-xs-3">' +
      '<img src="../images/start.png">' +
      "</div>" +
      '<div class="col-xs-9">' +
      "<h3>This is the first block of your program. Add blocks under this one.</h3>" +
      "</div>" +
      "</div>" +
      '<div class="row">' +
      '<div class="col-xs-5">' +
      '<img src="../images/if_obstacle_then.png">' +
      "</div>" +
      '<div class="col-xs-7">' +
      '<h3>Walk the blocks in this "If" only if the bogo sees an orange rectangle ahead.</h3>' +
      "</div>" +
      "</div>" +
      '<div class="row">' +
      '<div class="col-xs-5">' +
      '<img src="../images/if_stacked_obstacles_then.png">' +
      "</div>" +
      '<div class="col-xs-7">' +
      '<h3>Walk the blocks in this "If" only if the bogo sees stacked orange rectangles ahead.</h3>' +
      "</div>" +
      "</div>" +
      '<div class="row">' +
      '<div class="col-xs-3">' +
      '<img src="../images/walk.png">' +
      "</div>" +
      '<div class="col-xs-9">' +
      "<h3>Each Walk block moves the bogo one step forward to the next space on the path.</h3>" +
      "</div>" +
      "</div>" +
      '<div class="row">' +
      '<div class="col-xs-3">' +
      '<img src="../images/jump.png">' +
      "</div>" +
      '<div class="col-xs-9">' +
      "<h3>Each Jump block moves the bogo jump over the orange rectangle and moves it two steps forward.</h3>" +
      "</div>" +
      "</div>" +
      '<div class="row">' +
      '<div class="col-xs-3">' +
      '<img src="../images/super_jump.png">' +
      "</div>" +
      '<div class="col-xs-9">' +
      "<h3>Each Super Jump block makes the bogo jump over stacked orange rectangles and moves him two steps forward.</h3>" +
      "</div>" +
      "</div>"
  );

  $("button#newBlockTip").hide();
  //$("#newBlockModal .modal-body").html(
  //  '<div class="row">'+
  //  '<div class="col-xs-5">'+
  //  '<img src="../images/if_double_obstacle_then_long_jump.png">'+
  //  '</div>'+
  //  '<div class="col-xs-7">'+
  //  '<h3>The "Long Jump" block will make the bogo jump 3 spaces.</h3>'+
  //  '</div>'+
  //  '</div>'
  //);

  //Insert Start block in workspace
  InsertBlock("start", 200, 50, false, true);

  redraw();
}

function LoadLevel39() {
  if (currentLevel != 39) {
    $("#instructionsModal .modal-body").html(
      "<h3>Reach the green circle, but do a long jump if there are double orange rectangles.</h3>"
    );
    $("#instructionsModal").modal("show");
    currentLevel = 39;
    tipToShow = 1;
    totalNumTips = 3;
    numSteps = 9;
  }

  player = new Player();
  //player.init_x = 100;
  //player.init_y = 200;

  player.x = player.init_x;
  player.y = player.init_y;

  target = new Target();
  target.y = player.y + player.diameter * 0;
  target.x = player.x + player.diameter * 9; //Position target one steps away from player
  target.color = color(51, 153, 0);

  obstacles = [
    new Obstacle(player.x + player.diameter, player.y),
    new Obstacle(player.x + player.diameter * 3, player.y),
    new Obstacle(player.x + player.diameter * 4, player.y),
    new Obstacle(player.x + player.diameter * 6, player.y),
    new Obstacle(player.x + player.diameter * 7, player.y),
  ];

  Blockly.updateToolbox(
    '<xml id="toolbox" style="display: none">' +
      '<block type="controls_whileUntil">' +
      '<field name="MODE">UNTIL</field>' +
      '<value name="BOOL">' +
      "<block " +
      'movable="false" ' +
      'type="target2">' +
      "</block>" +
      "</value>" +
      "</block>" +
      '<block type="controls_if">' +
      //'<mutation else="1"></mutation>' +
      '<value name="IF0">' +
      "<block " +
      'movable="false" ' +
      //'deletable="false" ' +
      'type="obstacle2">' +
      "</block>" +
      "</value>" +
      '<value name="DO0">' +
      "<block " +
      'movable="false" ' +
      //'deletable="false" ' +
      'type="jump">' +
      "</block>" +
      "</value>" +
      "</block>" +
      '<block type="controls_if">' +
      '<mutation else="1"></mutation>' +
      '<value name="IF0">' +
      "<block " +
      'movable="false" ' +
      //'deletable="false" ' +
      'type="obstacle3">' +
      "</block>" +
      "</value>" +
      '<value name="DO0">' +
      "<block " +
      'movable="false" ' +
      //'deletable="false" ' +
      'type="long_jump">' +
      "</block>" +
      "</value>" +
      "</block>" +
      //'<block ' +
      //'type="jump">' +
      //'</block>'+

      "<block " +
      'type="walk">' +
      "</block>" +
      "</xml>"
  );

  $("#tipModal1 .modal-body").html(
    "<h3>To write the best code, you should solve the problem using 7 or less blocks. If you can't do it the first time, just come back later and try again.</h3>"
  );

  $("#tipModal2 .modal-body").html(
    '<h3>Try using the "If" block with "Long Jump" or "Jump" block inside to avoid the orange rectangles.</h3>'
  );

  $("#tipModal3 .modal-body").html(
    "<h3>You need to program the bogo to reach the green circle." +
      "Connect the visual blocks in the right way to get the bogo moving." +
      'Try using the "If" block with "Long Jump" or "Jump" block.' +
      "</h3>" +
      //'<h3>Connect the visual blocks in the right way to get the bogo moving inside the "Repeat Until" loop.</h3>'+
      '<div class="row">' +
      '<div class="col-xs-3">' +
      '<img src="../images/start.png">' +
      "</div>" +
      '<div class="col-xs-9">' +
      "<h3>This is the first block of your program. Add blocks under this one.</h3>" +
      "</div>" +
      "</div>" +
      '<div class="row">' +
      '<div class="col-xs-5">' +
      '<img src="../images/repeat_until_target2.png">' +
      "</div>" +
      '<div class="col-xs-7">' +
      '<h3>Repeat the blocks in this "Repeat Until" until the bogo reaches the green circle. ' +
      'The "repeat until" block is useful when you want to run the same code again and again until the goal is reached. ' +
      'In this case the goal is the green circle. You can connect the "Walk" and "Long Jump" blocks inside it.</h3>' +
      "</div>" +
      "</div>" +
      '<div class="row">' +
      '<div class="col-xs-5">' +
      '<img src="../images/if_obstacle_then.png">' +
      "</div>" +
      '<div class="col-xs-7">' +
      '<h3>Walk the blocks in this "If" only if the bogo sees an orange rectangle ahead.</h3>' +
      "</div>" +
      "</div>" +
      '<div class="row">' +
      '<div class="col-xs-5">' +
      '<img src="../images/if_double_obstacle_then_else.png">' +
      "</div>" +
      '<div class="col-xs-7">' +
      '<h3>Walk the blocks in this "If" only if the bogo sees double orange rectangles ahead. ' +
      'Otherwise, run the blocks in the second "Else" section.</h3>' +
      "</div>" +
      "</div>" +
      '<div class="row">' +
      '<div class="col-xs-3">' +
      '<img src="../images/walk.png">' +
      "</div>" +
      '<div class="col-xs-9">' +
      "<h3>Each Walk block moves the bogo one step forward to the next space on the path.</h3>" +
      "</div>" +
      "</div>" +
      '<div class="row">' +
      '<div class="col-xs-3">' +
      '<img src="../images/jump.png">' +
      "</div>" +
      '<div class="col-xs-9">' +
      "<h3>Each Jump block makes the bogo jump over an orange rectangle and moves it two steps forward.</h3>" +
      "</div>" +
      "</div>" +
      '<div class="row">' +
      '<div class="col-xs-3">' +
      '<img src="../images/long_jump.png">' +
      "</div>" +
      '<div class="col-xs-9">' +
      "<h3>Each Long Jump block makes the bogo jump over the double orange rectangles and moves him three steps forward.</h3>" +
      "</div>" +
      "</div>"
  );

  $("button#newBlockTip").hide();
  //$("#newBlockModal .modal-body").html(
  //  '<div class="row">'+
  //  '<div class="col-xs-5">'+
  //  '<img src="../images/if_double_obstacle_then_long_jump.png">'+
  //  '</div>'+
  //  '<div class="col-xs-7">'+
  //  '<h3>The "Long Jump" block will make the bogo jump 3 spaces.</h3>'+
  //  '</div>'+
  //  '</div>'
  //);

  //Insert Start block in workspace
  InsertBlock("start", 200, 50, false, true);

  redraw();
}

function LoadLevel40() {
  if (currentLevel != 40) {
    $("#instructionsModal .modal-body").html(
      "<h3>Reach the green circle, but do a super jump if there are stacked orange rectangles.</h3>"
    );
    $("#instructionsModal").modal("show");
    currentLevel = 40;
    tipToShow = 1;
    totalNumTips = 3;
    numSteps = 9;
  }

  player = new Player();
  //player.init_x = 100;
  //player.init_y = 200;

  player.x = player.init_x;
  player.y = player.init_y;

  target = new Target();
  target.y = player.y + player.diameter * 0;
  target.x = player.x + player.diameter * 9; //Position target one steps away from player
  target.color = color(51, 153, 0);

  obstacles = [
    new Obstacle(player.x + player.diameter * 1, player.y),
    new Obstacle(player.x + player.diameter * 3, player.y),
    new Obstacle(player.x + player.diameter * 3, player.y - player.diameter),
    new Obstacle(player.x + player.diameter * 5, player.y),
    new Obstacle(player.x + player.diameter * 5, player.y - player.diameter),
    new Obstacle(player.x + player.diameter * 7, player.y),
    new Obstacle(player.x + player.diameter * 7, player.y - player.diameter),
  ];

  Blockly.updateToolbox(
    '<xml id="toolbox" style="display: none">' +
      '<block type="controls_whileUntil">' +
      '<field name="MODE">UNTIL</field>' +
      '<value name="BOOL">' +
      "<block " +
      'movable="false" ' +
      'type="target2">' +
      "</block>" +
      "</value>" +
      "</block>" +
      '<block type="controls_if">' +
      //'<mutation else="1"></mutation>' +
      '<value name="IF0">' +
      "<block " +
      'movable="false" ' +
      //'deletable="false" ' +
      'type="obstacle2">' +
      "</block>" +
      "</value>" +
      '<value name="DO0">' +
      "<block " +
      'movable="false" ' +
      //'deletable="false" ' +
      'type="jump">' +
      "</block>" +
      "</value>" +
      "</block>" +
      '<block type="controls_if">' +
      '<mutation else="1"></mutation>' +
      '<value name="IF0">' +
      "<block " +
      'movable="false" ' +
      //'deletable="false" ' +
      'type="obstacle4">' +
      "</block>" +
      "</value>" +
      '<value name="DO0">' +
      "<block " +
      'movable="false" ' +
      //'deletable="false" ' +
      'type="super_jump">' +
      "</block>" +
      "</value>" +
      "</block>" +
      //'<block ' +
      //'type="jump">' +
      //'</block>'+

      "<block " +
      'type="walk">' +
      "</block>" +
      "</xml>"
  );

  $("#tipModal1 .modal-body").html(
    "<h3>To write the best code, you should solve the problem using 7 or less blocks. If you can't do it the first time, just come back later and try again.</h3>"
  );

  $("#tipModal2 .modal-body").html(
    '<h3>Try using the "If" block with "Super Jump" or "Jump" block to avoid the orange rectangles.</h3>'
  );

  $("#tipModal3 .modal-body").html(
    "<h3>You need to program the bogo to reach the green circle." +
      "Connect the visual blocks in the right way to get the bogo moving." +
      'Try using the "If" block with "Super Jump" or "Jump" block.' +
      "</h3>" +
      //'<h3>Connect the visual blocks in the right way to get the bogo moving inside the "Repeat Until" loop.</h3>'+
      '<div class="row">' +
      '<div class="col-xs-3">' +
      '<img src="../images/start.png">' +
      "</div>" +
      '<div class="col-xs-9">' +
      "<h3>This is the first block of your program. Add blocks under this one.</h3>" +
      "</div>" +
      "</div>" +
      '<div class="row">' +
      '<div class="col-xs-5">' +
      '<img src="../images/repeat_until_target2.png">' +
      "</div>" +
      '<div class="col-xs-7">' +
      '<h3>Repeat the blocks in this "Repeat Until" until the bogo reaches the green circle. ' +
      'The "repeat until" block is useful when you want to run the same code again and again until the goal is reached. ' +
      'In this case the goal is the green circle. You can connect the "Walk" and "Super Jump" blocks inside it.</h3>' +
      "</div>" +
      "</div>" +
      '<div class="row">' +
      '<div class="col-xs-5">' +
      '<img src="../images/if_obstacle_then.png">' +
      "</div>" +
      '<div class="col-xs-7">' +
      '<h3>Walk the blocks in this "If" only if the bogo sees an orange rectangle ahead.</h3>' +
      "</div>" +
      "</div>" +
      '<div class="row">' +
      '<div class="col-xs-5">' +
      '<img src="../images/if_stacked_obstacles_then_else.png">' +
      "</div>" +
      '<div class="col-xs-7">' +
      '<h3>Walk the blocks in this "If" only if the bogo sees stacked orange rectangles ahead. ' +
      'Otherwise, run the blocks in the second "Else" section.</h3>' +
      "</div>" +
      "</div>" +
      '<div class="row">' +
      '<div class="col-xs-3">' +
      '<img src="../images/walk.png">' +
      "</div>" +
      '<div class="col-xs-9">' +
      "<h3>Each Walk block moves the bogo one step forward to the next space on the path.</h3>" +
      "</div>" +
      "</div>" +
      '<div class="row">' +
      '<div class="col-xs-3">' +
      '<img src="../images/jump.png">' +
      "</div>" +
      '<div class="col-xs-9">' +
      "<h3>Each Jump block moves the bogo jump over the orange rectangle and moves it two steps forward.</h3>" +
      "</div>" +
      "</div>" +
      '<div class="row">' +
      '<div class="col-xs-3">' +
      '<img src="../images/super_jump.png">' +
      "</div>" +
      '<div class="col-xs-9">' +
      "<h3>Each Super Jump block makes the bogo jump over stacked orange rectangles and moves him two steps forward.</h3>" +
      "</div>" +
      "</div>"
  );

  $("button#newBlockTip").hide();
  //$("#newBlockModal .modal-body").html(
  //  '<div class="row">'+
  //  '<div class="col-xs-5">'+
  //  '<img src="../images/if_double_obstacle_then_long_jump.png">'+
  //  '</div>'+
  //  '<div class="col-xs-7">'+
  //  '<h3>The "Long Jump" block will make the bogo jump 3 spaces.</h3>'+
  //  '</div>'+
  //  '</div>'
  //);

  //Insert Start block in workspace
  InsertBlock("start", 200, 50, false, true);

  redraw();
}

function LoadLevel41() {
  if (currentLevel != 41) {
    $("#instructionsModal .modal-body").html(
      "<h3>Reach the green circle with combination jumps.</h3>"
    );
    $("#instructionsModal").modal("show");
    currentLevel = 41;
    tipToShow = 1;
    totalNumTips = 3;
    numSteps = 9;
  }

  player = new Player();
  //player.init_x = 100;
  //player.init_y = 200;

  player.x = player.init_x;
  player.y = player.init_y;

  target = new Target();
  target.y = player.y + player.diameter * 0;
  target.x = player.x + player.diameter * 9; //Position target one steps away from player
  target.color = color(51, 153, 0);

  obstacles = [
    new Obstacle(player.x + player.diameter * 2, player.y),
    new Obstacle(player.x + player.diameter * 2, player.y - player.diameter),
    new Obstacle(player.x + player.diameter * 4, player.y),
    new Obstacle(player.x + player.diameter * 5, player.y),
    new Obstacle(player.x + player.diameter * 7, player.y),
    new Obstacle(player.x + player.diameter * 7, player.y - player.diameter),
  ];

  Blockly.updateToolbox(
    '<xml id="toolbox" style="display: none">' +
      '<block type="controls_whileUntil">' +
      '<field name="MODE">UNTIL</field>' +
      '<value name="BOOL">' +
      "<block " +
      'movable="false" ' +
      'type="target2">' +
      "</block>" +
      "</value>" +
      "</block>" +
      '<block type="controls_if">' +
      '<mutation else="1"></mutation>' +
      '<value name="IF0">' +
      "<block " +
      'movable="false" ' +
      //'deletable="false" ' +
      'type="obstacle3">' +
      "</block>" +
      "</value>" +
      '<value name="DO0">' +
      "<block " +
      'movable="false" ' +
      //'deletable="false" ' +
      'type="long_jump">' +
      "</block>" +
      "</value>" +
      "</block>" +
      '<block type="controls_if">' +
      '<mutation else="1"></mutation>' +
      '<value name="IF0">' +
      "<block " +
      'movable="false" ' +
      //'deletable="false" ' +
      'type="obstacle4">' +
      "</block>" +
      "</value>" +
      '<value name="DO0">' +
      "<block " +
      'movable="false" ' +
      //'deletable="false" ' +
      'type="super_jump">' +
      "</block>" +
      "</value>" +
      "</block>" +
      //'<block ' +
      //'type="jump">' +
      //'</block>'+

      "<block " +
      'type="walk">' +
      "</block>" +
      "</xml>"
  );

  $("#tipModal1 .modal-body").html(
    "<h3>To write the best code, you should solve the problem using 7 or less blocks. If you can't do it the first time, just come back later and try again.</h3>"
  );

  $("#tipModal2 .modal-body").html(
    '<h3>Try using the "If" block with "Long Jump" or "Super Jump" blocks to avoid the orange rectangles.</h3>'
  );

  $("#tipModal3 .modal-body").html(
    "<h3>You need to program the bogo to reach the green circle." +
      "Connect the visual blocks in the right way to get the bogo moving." +
      'Try using the "If" block with "Long Jump" or "Super Jump" block.' +
      "</h3>" +
      //'<h3>Connect the visual blocks in the right way to get the bogo moving inside the "Repeat Until" loop.</h3>'+
      '<div class="row">' +
      '<div class="col-xs-3">' +
      '<img src="../images/start.png">' +
      "</div>" +
      '<div class="col-xs-9">' +
      "<h3>This is the first block of your program. Add blocks under this one.</h3>" +
      "</div>" +
      "</div>" +
      '<div class="row">' +
      '<div class="col-xs-5">' +
      '<img src="../images/repeat_until_target2.png">' +
      "</div>" +
      '<div class="col-xs-7">' +
      '<h3>Repeat the blocks in this "Repeat Until" until the bogo reaches the green circle. ' +
      'The "repeat until" block is useful when you want to run the same code again and again until the goal is reached. ' +
      'In this case the goal is the green circle. You can connect the "Walk" and "Long Jump" blocks inside it.</h3>' +
      "</div>" +
      "</div>" +
      '<div class="row">' +
      '<div class="col-xs-5">' +
      '<img src="../images/if_double_obstacle_then_else.png">' +
      "</div>" +
      '<div class="col-xs-7">' +
      '<h3>Walk the blocks in this "If" only if the bogo sees double orange rectangles ahead. ' +
      'Otherwise, run the blocks in the second "Else" section.</h3>' +
      "</div>" +
      "</div>" +
      '<div class="row">' +
      '<div class="col-xs-5">' +
      '<img src="../images/if_stacked_obstacles_then_else.png">' +
      "</div>" +
      '<div class="col-xs-7">' +
      '<h3>Walk the blocks in this "If" only if the bogo sees stacked orange rectangles ahead. ' +
      'Otherwise, run the blocks in the second "Else" section.</h3>' +
      "</div>" +
      "</div>" +
      '<div class="row">' +
      '<div class="col-xs-3">' +
      '<img src="../images/walk.png">' +
      "</div>" +
      '<div class="col-xs-9">' +
      "<h3>Each Walk block moves the bogo one step forward to the next space on the path.</h3>" +
      "</div>" +
      "</div>" +
      '<div class="row">' +
      '<div class="col-xs-3">' +
      '<img src="../images/super_jump.png">' +
      "</div>" +
      '<div class="col-xs-9">' +
      "<h3>Each Super Jump block makes the bogo jump over stacked orange rectangles and moves him two steps forward.</h3>" +
      "</div>" +
      "</div>" +
      '<div class="row">' +
      '<div class="col-xs-3">' +
      '<img src="../images/long_jump.png">' +
      "</div>" +
      '<div class="col-xs-9">' +
      "<h3>Each Long Jump block makes the bogo jump over double orange rectangles and moves him three steps forward.</h3>" +
      "</div>" +
      "</div>"
  );

  $("button#newBlockTip").hide();
  //$("#newBlockModal .modal-body").html(
  //  '<div class="row">'+
  //  '<div class="col-xs-5">'+
  //  '<img src="../images/if_double_obstacle_then_long_jump.png">'+
  //  '</div>'+
  //  '<div class="col-xs-7">'+
  //  '<h3>The "Long Jump" block will make the bogo jump 3 spaces.</h3>'+
  //  '</div>'+
  //  '</div>'
  //);

  //Insert Start block in workspace
  InsertBlock("start", 200, 50, false, true);

  redraw();
}

function LoadLevel42() {
  if (currentLevel != 42) {
    $("#instructionsModal .modal-body").html(
      "<h3>Reach the green circle with combination jumps.</h3>"
    );
    $("#instructionsModal").modal("show");
    currentLevel = 42;
    tipToShow = 1;
    totalNumTips = 3;
    numSteps = 9;
  }

  player = new Player();
  //player.init_x = 100;
  //player.init_y = 200;

  player.x = player.init_x;
  player.y = player.init_y;

  target = new Target();
  target.y = player.y + player.diameter * 0;
  target.x = player.x + player.diameter * 9; //Position target one steps away from player
  target.color = color(51, 153, 0);

  obstacles = [
    new Obstacle(player.x + player.diameter * 2, player.y),
    new Obstacle(player.x + player.diameter * 2, player.y - player.diameter),
    new Obstacle(player.x + player.diameter * 4, player.y),
    new Obstacle(player.x + player.diameter * 5, player.y),
    new Obstacle(player.x + player.diameter * 7, player.y),
  ];

  Blockly.updateToolbox(
    '<xml id="toolbox" style="display: none">' +
      '<block type="controls_whileUntil">' +
      '<field name="MODE">UNTIL</field>' +
      '<value name="BOOL">' +
      "<block " +
      'movable="false" ' +
      'type="target2">' +
      "</block>" +
      "</value>" +
      "</block>" +
      '<block type="controls_if">' +
      '<mutation else="1"></mutation>' +
      '<value name="IF0">' +
      "<block " +
      'movable="false" ' +
      //'deletable="false" ' +
      'type="obstacle2">' +
      "</block>" +
      "</value>" +
      '<value name="DO0">' +
      "<block " +
      'movable="false" ' +
      //'deletable="false" ' +
      'type="jump">' +
      "</block>" +
      "</value>" +
      "</block>" +
      '<block type="controls_if">' +
      '<mutation else="1"></mutation>' +
      '<value name="IF0">' +
      "<block " +
      'movable="false" ' +
      //'deletable="false" ' +
      'type="obstacle3">' +
      "</block>" +
      "</value>" +
      '<value name="DO0">' +
      "<block " +
      'movable="false" ' +
      //'deletable="false" ' +
      'type="long_jump">' +
      "</block>" +
      "</value>" +
      "</block>" +
      '<block type="controls_if">' +
      '<mutation else="1"></mutation>' +
      '<value name="IF0">' +
      "<block " +
      'movable="false" ' +
      //'deletable="false" ' +
      'type="obstacle4">' +
      "</block>" +
      "</value>" +
      '<value name="DO0">' +
      "<block " +
      'movable="false" ' +
      //'deletable="false" ' +
      'type="super_jump">' +
      "</block>" +
      "</value>" +
      "</block>" +
      //'<block ' +
      //'type="jump">' +
      //'</block>'+

      "<block " +
      'type="walk">' +
      "</block>" +
      "</xml>"
  );

  $("#tipModal1 .modal-body").html(
    "<h3>To write the best code, you should solve the problem using 9 or less blocks. If you can't do it the first time, just come back later and try again.</h3>"
  );

  $("#tipModal2 .modal-body").html(
    '<h3>Try using the "If" block with "Long Jump" or "Super Jump", or "Jump" blocks to avoid the orange rectangles.</h3>'
  );

  $("#tipModal3 .modal-body").html(
    "<h3>You need to program the bogo to reach the green circle." +
      "Connect the visual blocks in the right way to get the bogo moving." +
      'Try using the "If" block with "Long Jump" or "Super Jump", or "Jump" block.' +
      "</h3>" +
      //'<h3>Connect the visual blocks in the right way to get the bogo moving inside the "Repeat Until" loop.</h3>'+
      '<div class="row">' +
      '<div class="col-xs-3">' +
      '<img src="../images/start.png">' +
      "</div>" +
      '<div class="col-xs-9">' +
      "<h3>This is the first block of your program. Add blocks under this one.</h3>" +
      "</div>" +
      "</div>" +
      '<div class="row">' +
      '<div class="col-xs-5">' +
      '<img src="../images/repeat_until_target2.png">' +
      "</div>" +
      '<div class="col-xs-7">' +
      '<h3>Repeat the blocks in this "Repeat Until" until the bogo reaches the green circle. ' +
      'The "repeat until" block is useful when you want to run the same code again and again until the goal is reached. ' +
      'In this case the goal is the green circle. You can connect the "Walk" and "Long Jump" blocks inside it.</h3>' +
      "</div>" +
      "</div>" +
      '<div class="row">' +
      '<div class="col-xs-5">' +
      '<img src="../images/if_obstacle_then_else.png">' +
      "</div>" +
      '<div class="col-xs-7">' +
      '<h3>Walk the blocks in this "If" only if the bogo sees an orange rectangles ahead.</h3>' +
      "</div>" +
      "</div>" +
      '<div class="row">' +
      '<div class="col-xs-5">' +
      '<img src="../images/if_double_obstacle_then_else.png">' +
      "</div>" +
      '<div class="col-xs-7">' +
      '<h3>Walk the blocks in this "If" only if the bogo sees double orange rectangles ahead. ' +
      'Otherwise, run the blocks in the second "Else" section.</h3>' +
      "</div>" +
      "</div>" +
      '<div class="row">' +
      '<div class="col-xs-5">' +
      '<img src="../images/if_stacked_obstacles_then_else.png">' +
      "</div>" +
      '<div class="col-xs-7">' +
      '<h3>Walk the blocks in this "If" only if the bogo sees stacked orange rectangles ahead. ' +
      'Otherwise, run the blocks in the second "Else" section.</h3>' +
      "</div>" +
      "</div>" +
      '<div class="row">' +
      '<div class="col-xs-3">' +
      '<img src="../images/walk.png">' +
      "</div>" +
      '<div class="col-xs-9">' +
      "<h3>Each Walk block moves the bogo one step forward to the next space on the path.</h3>" +
      "</div>" +
      "</div>" +
      '<div class="row">' +
      '<div class="col-xs-3">' +
      '<img src="../images/jump.png">' +
      "</div>" +
      '<div class="col-xs-9">' +
      "<h3>Each Jump block makes the bogo jump over an orange rectangle and moves it two steps forward.</h3>" +
      "</div>" +
      "</div>" +
      '<div class="row">' +
      '<div class="col-xs-3">' +
      '<img src="../images/super_jump.png">' +
      "</div>" +
      '<div class="col-xs-9">' +
      "<h3>Each Super Jump block makes the bogo jump over stacked orange rectangles and moves him two steps forward.</h3>" +
      "</div>" +
      "</div>" +
      '<div class="row">' +
      '<div class="col-xs-3">' +
      '<img src="../images/long_jump.png">' +
      "</div>" +
      '<div class="col-xs-9">' +
      "<h3>Each Long Jump block makes the bogo jump over double orange rectangles and moves him three steps forward.</h3>" +
      "</div>" +
      "</div>"
  );

  $("button#newBlockTip").hide();
  //$("#newBlockModal .modal-body").html(
  //  '<div class="row">'+
  //  '<div class="col-xs-5">'+
  //  '<img src="../images/if_double_obstacle_then_long_jump.png">'+
  //  '</div>'+
  //  '<div class="col-xs-7">'+
  //  '<h3>The "Long Jump" block will make the bogo jump 3 spaces.</h3>'+
  //  '</div>'+
  //  '</div>'
  //);

  //Insert Start block in workspace
  InsertBlock("start", 200, 50, false, true);

  redraw();
}

function LoadLevel43() {
  //Load level 1 after they complete level 42

  LoadLevel(1);
}

//CHALLENGE TASK
function LoadLevel99() {
  if (currentLevel != 99) {
    $("#instructionsModal .modal-body").html(
      "<h3>Choose the right path to reach the red circle. You must do this USING 9 BLOCKS or less.</h3>"
    );
    $("#instructionsModal").modal("show");

    currentLevel = 99;
    tipToShow = 1;
    totalNumTips = 5;
    numSteps = 0;
  }

  controls_whileUntil_options = [
    ["repeat until", "UNTIL"],
    ["repeat while", "WHILE"],
  ];

  player = new PlayerChallenge();
  //player.init_x = 50;
  //player.init_y = 200;

  player.x = player.init_x;
  player.y = player.init_y;

  target = new Target();
  target.y = player.y - player.diameter * 2;
  target.x = player.x + player.diameter * 6; //Position target three steps away from player
  target.color = color(153, 51, 0);

  obstacles = [
    new ObstacleChallenge(
      player.x - player.diameter,
      player.y - player.diameter * 3,
      false
    ),
    new ObstacleChallenge(player.x, player.y - player.diameter * 3, false),
    new ObstacleChallenge(
      player.x + player.diameter,
      player.y - player.diameter * 3,
      false
    ),
    new ObstacleChallenge(
      player.x + player.diameter * 2,
      player.y - player.diameter * 3,
      false
    ),
    new ObstacleChallenge(
      player.x + player.diameter * 3,
      player.y - player.diameter * 3,
      false
    ),
    new ObstacleChallenge(
      player.x + player.diameter * 4,
      player.y - player.diameter * 3,
      false
    ),
    new ObstacleChallenge(
      player.x + player.diameter * 5,
      player.y - player.diameter * 3,
      false
    ),
    new ObstacleChallenge(
      player.x + player.diameter * 6,
      player.y - player.diameter * 3,
      false
    ),
    new ObstacleChallenge(
      player.x + player.diameter * 7,
      player.y - player.diameter * 3,
      false
    ),

    new ObstacleChallenge(
      player.x - player.diameter,
      player.y - player.diameter * 2,
      false
    ),
    new ObstacleChallenge(player.x, player.y - player.diameter * 2, false),
    new ObstacleChallenge(
      player.x + player.diameter,
      player.y - player.diameter * 2,
      false
    ),
    new ObstacleChallenge(
      player.x + player.diameter * 2,
      player.y - player.diameter * 2,
      true
    ),
    new ObstacleChallenge(
      player.x + player.diameter * 3,
      player.y - player.diameter * 2,
      false
    ),
    new ObstacleChallenge(
      player.x + player.diameter * 4,
      player.y - player.diameter * 2,
      false
    ),
    new ObstacleChallenge(
      player.x + player.diameter * 5,
      player.y - player.diameter * 2,
      false
    ),
    //new Obstacle(player.x + player.diameter*6, player.y - player.diameter*2),
    new ObstacleChallenge(
      player.x + player.diameter * 7,
      player.y - player.diameter * 2,
      false
    ),

    new ObstacleChallenge(
      player.x - player.diameter,
      player.y - player.diameter,
      false
    ),
    new ObstacleChallenge(player.x, player.y - player.diameter, false),
    new ObstacleChallenge(
      player.x + player.diameter,
      player.y - player.diameter,
      false
    ),
    //new Obstacle(player.x + player.diameter*2, player.y - player.diameter),
    new ObstacleChallenge(
      player.x + player.diameter * 3,
      player.y - player.diameter,
      false
    ),
    new ObstacleChallenge(
      player.x + player.diameter * 4,
      player.y - player.diameter,
      false
    ),
    new ObstacleChallenge(
      player.x + player.diameter * 5,
      player.y - player.diameter,
      false
    ),
    //new Obstacle(player.x + player.diameter*6, player.y - player.diameter),
    new ObstacleChallenge(
      player.x + player.diameter * 7,
      player.y - player.diameter,
      false
    ),

    new ObstacleChallenge(player.x - player.diameter, player.y, false),
    //new ObstacleChallenge(player.x,                     player.y,                   true),
    //new ObstacleChallenge(player.x + player.diameter,   player.y,                   true),
    //new ObstacleChallenge(player.x + player.diameter*2, player.y,                   true),
    //new ObstacleChallenge(player.x + player.diameter*3, player.y,                   true),
    //new ObstacleChallenge(player.x + player.diameter*4, player.y,                   true),
    new ObstacleChallenge(player.x + player.diameter * 5, player.y, true),
    //new ObstacleChallenge(player.x + player.diameter*6, player.y,                   true),
    new ObstacleChallenge(player.x + player.diameter * 7, player.y, false),

    new ObstacleChallenge(
      player.x - player.diameter,
      player.y + player.diameter,
      false
    ),
    new ObstacleChallenge(player.x, player.y + player.diameter, false),
    new ObstacleChallenge(
      player.x + player.diameter,
      player.y + player.diameter,
      false
    ),
    //new ObstacleChallenge(player.x + player.diameter*2, player.y + player.diameter, true),
    new ObstacleChallenge(
      player.x + player.diameter * 3,
      player.y + player.diameter,
      false
    ),
    new ObstacleChallenge(
      player.x + player.diameter * 4,
      player.y + player.diameter,
      false
    ),
    new ObstacleChallenge(
      player.x + player.diameter * 5,
      player.y + player.diameter,
      false
    ),
    //new ObstacleChallenge(player.x + player.diameter*6, player.y + player.diameter, true),
    new ObstacleChallenge(
      player.x + player.diameter * 7,
      player.y + player.diameter,
      false
    ),

    new ObstacleChallenge(
      player.x - player.diameter,
      player.y + player.diameter * 2,
      false
    ),
    new ObstacleChallenge(player.x, player.y + player.diameter * 2, true),
    //new ObstacleChallenge(player.x + player.diameter,   player.y + player.diameter*2, true),
    //new ObstacleChallenge(player.x + player.diameter*2, player.y + player.diameter*2, true),
    new ObstacleChallenge(
      player.x + player.diameter * 3,
      player.y + player.diameter * 2,
      false
    ),
    new ObstacleChallenge(
      player.x + player.diameter * 4,
      player.y + player.diameter * 2,
      false
    ),
    //new ObstacleChallenge(player.x + player.diameter*5, player.y + player.diameter*2, true),
    //new ObstacleChallenge(player.x + player.diameter*6, player.y + player.diameter*2, true),
    new ObstacleChallenge(
      player.x + player.diameter * 7,
      player.y + player.diameter * 2,
      false
    ),

    new ObstacleChallenge(
      player.x - player.diameter,
      player.y + player.diameter * 3,
      false
    ),
    new ObstacleChallenge(player.x, player.y + player.diameter * 3, false),
    new ObstacleChallenge(
      player.x + player.diameter,
      player.y + player.diameter * 3,
      false
    ),
    //new ObstacleChallenge(player.x + player.diameter*2, player.y + player.diameter*3, true),
    //new ObstacleChallenge(player.x + player.diameter*3, player.y + player.diameter*3, true),
    //new ObstacleChallenge(player.x + player.diameter*4, player.y + player.diameter*3, true),
    //new ObstacleChallenge(player.x + player.diameter*5, player.y + player.diameter*3, true),
    new ObstacleChallenge(
      player.x + player.diameter * 6,
      player.y + player.diameter * 3,
      false
    ),
    new ObstacleChallenge(
      player.x + player.diameter * 7,
      player.y + player.diameter * 3,
      false
    ),

    new ObstacleChallenge(
      player.x - player.diameter,
      player.y + player.diameter * 4,
      false
    ),
    new ObstacleChallenge(player.x, player.y + player.diameter * 4, false),
    new ObstacleChallenge(
      player.x + player.diameter,
      player.y + player.diameter * 4,
      false
    ),
    new ObstacleChallenge(
      player.x + player.diameter * 2,
      player.y + player.diameter * 4,
      false
    ),
    new ObstacleChallenge(
      player.x + player.diameter * 3,
      player.y + player.diameter * 4,
      false
    ),
    new ObstacleChallenge(
      player.x + player.diameter * 4,
      player.y + player.diameter * 4,
      false
    ),
    new ObstacleChallenge(
      player.x + player.diameter * 5,
      player.y + player.diameter * 4,
      false
    ),
    new ObstacleChallenge(
      player.x + player.diameter * 6,
      player.y + player.diameter * 4,
      false
    ),
    new ObstacleChallenge(
      player.x + player.diameter * 7,
      player.y + player.diameter * 4,
      false
    ),
  ];

  Blockly.updateToolbox(
    '<xml id="toolbox" style="display: none">' +
      '<block type="controls_repeat">' +
      '<field name="TIMES">3</field>' +
      "</block>" +
      '<block type="controls_whileUntil">' +
      '<field name="MODE">UNTIL</field>' +
      '<value name="BOOL">' +
      "<block " +
      'movable="false" ' +
      'type="target">' +
      "</block>" +
      "</value>" +
      "</block>" +
      '<block type="controls_if">' +
      '<mutation else="1"></mutation>' +
      '<value name="IF0">' +
      "<block " +
      'movable="false" ' +
      'type="empty_cell">' +
      "</block>" +
      "</value>" +
      "</block>" +
      '<block type="controls_if">' +
      '<mutation else="1"></mutation>' +
      '<value name="IF0">' +
      "<block " +
      'movable="false" ' +
      'type="empty_cell_left">' +
      "</block>" +
      "</value>" +
      "</block>" +
      '<block type="controls_if">' +
      '<mutation else="1"></mutation>' +
      '<value name="IF0">' +
      "<block " +
      'movable="false" ' +
      'type="empty_cell_right">' +
      "</block>" +
      "</value>" +
      "</block>" +
      '<block type="turn_left"></block>' +
      '<block type="turn_right"></block>' +
      '<block type="forward"></block>' +
      "</xml>"
  );

  $("#tipModal1 .modal-body").html(
    "<h3>To write the best code, you should solve the problem using 9 or less blocks. If you can't do it the first time, just come back later and try again.</h3>"
  );
  $("#tipModal2 .modal-body").html(
    '<h4>Try using the "repeat until" and "repeat" block until you reach the red circle.</h4>'
  );
  $("#tipModal3 .modal-body").html(
    '<h4>Try using the "turn right" if there is a path to the right.</h4>'
  );
  $("#tipModal4 .modal-body").html(
    '<h4>Try using the "turn left" if there is a path to the left.</h4>'
  );
  $("#tipModal5 .modal-body").html(
    "<h4>You need to program the triangle to reach the red circle.</h4>" +
      '<h4>Connect the visual blocks in the right way to get the triangle moving. Try using the "repeat until" or "repeat while" with the "turn right"' +
      ' "turn left", and "forward" blocks.</h4>' +
      '<div class="row">' +
      '<div class="col-xs-5">' +
      '<img src="../images/repeat3.png">' +
      "</div>" +
      '<div class="col-xs-7">' +
      '<h4>Repeats the blocks in this "Repeat" block 3 times. The "Repeat" block is useful when you want to run the same code again and again. You can connect the "forward" block inside. You can also change the number of times you want to repeat the code.</h4>' +
      "</div>" +
      "</div>" +
      '<div class="row">' +
      '<div class="col-xs-5">' +
      '<img src="../images/repeat_until_target.png">' +
      "</div>" +
      '<div class="col-xs-7">' +
      '<h4>Repeat the blocks in this "Repeat Until" until the triangle reaches the red circle. ' +
      'The "repeat until" block is useful when you want to run the same code again and again until the goal is reached. ' +
      "In this case the goal is the green circle. You can connect any blocks inside it.</h4>" +
      "</div>" +
      "</div>" +
      '<div class="row">' +
      '<div class="col-xs-5">' +
      '<img src="../images/if_path_in_front_then_else.png">' +
      "</div>" +
      '<div class="col-xs-7">' +
      '<h4>Run the blocks in this "If" only if there is a path to the front. ' +
      'Otherwise, run the blocks in the "Else" section.</h4>' +
      "</div>" +
      "</div>" +
      '<div class="row">' +
      '<div class="col-xs-5">' +
      '<img src="../images/if_path_left_then_else.png">' +
      "</div>" +
      '<div class="col-xs-7">' +
      '<h4>Run the blocks in this "If" only if there is a path to the left ahead. ' +
      'Otherwise, run the blocks in the "Else" section.</h4>' +
      "</div>" +
      "</div>" +
      '<div class="row">' +
      '<div class="col-xs-5">' +
      '<img src="../images/if_path_right_then_else.png">' +
      "</div>" +
      '<div class="col-xs-7">' +
      '<h4>Run the blocks in this "If" only if there is a path to the right ahead. ' +
      'Otherwise, run the blocks in the "Else" section.</h4>' +
      "</div>" +
      "</div>" +
      '<div class="row">' +
      '<div class="col-xs-5">' +
      '<img src="../images/forward.png">' +
      "</div>" +
      '<div class="col-xs-7">' +
      '<h4>Each "forward" block moves the triangle one step forward to the next space on the path.</h4>' +
      "</div>" +
      "</div>" +
      '<div class="row">' +
      '<div class="col-xs-5">' +
      '<img src="../images/turn_left.png">' +
      "</div>" +
      '<div class="col-xs-7">' +
      '<h4>Each "turn left" block makes the triangle turn to the left.</h4>' +
      "</div>" +
      "</div>" +
      '<div class="row">' +
      '<div class="col-xs-5">' +
      '<img src="../images/turn_right.png">' +
      "</div>" +
      '<div class="col-xs-7">' +
      '<h4>Each "turn right" block makes the triangle turn to the right.</h4>' +
      "</div>" +
      "</div>"
  );

  $("button#newBlockTip").hide();

  //Insert Start block in workspace
  InsertBlock("start", 200, 20, false, true);

  redraw();
}

//function LoadLevel100(){
//  if(currentLevel != 100){
//    $("#instructionsModal .modal-body").html("<h3>Use the repeat block to reach the red circle</h3>");
//    $("#instructionsModal").modal("show");
//    currentLevel = 100;
//    tipToShow = 1;
//    totalNumTips = 2;
//    numSteps = 0;
//  }
//
//  controls_whileUntil_options = [['repeat until', 'UNTIL'], ['repeat while', 'WHILE']];
//
//  player = new PlayerChallenge();
//  player.init_x = 50;
//  player.init_y = 200;
//
//  player.x = player.init_x;
//  player.y = player.init_y;
//
//  target = new Target();
//  target.y = player.y + player.diameter*1;
//  target.x = player.x + player.diameter*4; //Position target three steps away from player
//  target.color = color(153, 51, 0);
//
//  obstacles = [
//    new Obstacle(player.x + player.diameter*2, player.y - player.diameter*2),
//    new Obstacle(player.x + player.diameter*6, player.y - player.diameter*2),
//
//    new Obstacle(player.x + player.diameter*2, player.y - player.diameter*1),
//    new Obstacle(player.x + player.diameter*6, player.y - player.diameter*1),
//
//    new Obstacle(player.x - player.diameter*1, player.y + player.diameter*0),
//    new Obstacle(player.x - player.diameter*2, player.y + player.diameter*0),
//    new Obstacle(player.x + player.diameter*3, player.y + player.diameter*0),
//    new Obstacle(player.x - player.diameter*4, player.y + player.diameter*0),
//    new Obstacle(player.x + player.diameter*5, player.y + player.diameter*0),
//    new Obstacle(player.x - player.diameter*6, player.y + player.diameter*0),
//
//    new Obstacle(player.x + player.diameter*2, player.y + player.diameter*1),
//    new Obstacle(player.x + player.diameter*6, player.y + player.diameter*1),
//
//    new Obstacle(player.x - player.diameter*0, player.y + player.diameter*2),
//    new Obstacle(player.x - player.diameter*1, player.y + player.diameter*2),
//    new Obstacle(player.x + player.diameter*2, player.y + player.diameter*2),
//    new Obstacle(player.x + player.diameter*5, player.y + player.diameter*2),
//    new Obstacle(player.x - player.diameter*6, player.y + player.diameter*2),
//
//    new Obstacle(player.x - player.diameter*2, player.y + player.diameter*3),
//    new Obstacle(player.x + player.diameter*3, player.y + player.diameter*3),
//    new Obstacle(player.x - player.diameter*4, player.y + player.diameter*3),
//    new Obstacle(player.x + player.diameter*5, player.y + player.diameter*3)
//  ];
//
//  Blockly.updateToolbox(
//    '<xml id="toolbox" style="display: none">'+
//
//    '<block type="controls_whileUntil">' +
//    '<field name="MODE">UNTIL</field>' +
//    '<value name="BOOL">' +
//    '<block ' +
//    'movable="false" ' +
//    'type="target">' +
//    '</block>' +
//    '</value>' +
//    '</block>' +
//
//    '<block ' +
//    'editable="false" ' +
//    'type="controls_whileUntil">' +
//    '<field name="MODE">WHILE</field>' +
//    '<value name="BOOL">' +
//    '<block ' +
//    'movable="false" ' +
//    'type="empty_cell">' +
//    '</block>' +
//    '</value>' +
//    '</block>' +
//
//    '<block type="controls_if">'+
//    '<mutation else="1"></mutation>' +
//    '<value name="IF0">' +
//    '<block ' +
//    'movable="false" ' +
//    'type="empty_cell_left">'+
//    '</block>'+
//    '</value>'+
//    '</block>'+
//
//    '<block type="controls_if">'+
//    '<value name="IF0">' +
//    '<block ' +
//    'movable="false" ' +
//    'type="empty_cell_right">'+
//    '</block>'+
//    '</value>'+
//    '</block>'+
//
//    '<block type="turn_left"></block>'+
//    '<block type="turn_right"></block>'+
//    '<block type="forward"></block>'+
//
//    '</xml>'
//  );
//
//  $("#tipModal1 .modal-body").html(
//    '<h3>To write the best code, you should solve the problem using 3 or less blocks. If you can\'t do it the first time, just come back later and try again.</h3>'
//  );
//  $("#tipModal2 .modal-body").html(
//    '<h4>Try using the "Repeat" block with a "Walk" block inside. Change the number to change the number of times to repeat.</h4>'+
//    '<h4>Connect the visual blocks in the right way to get the cat moving. Try using the "Repeat" and "Walk" blocks.</h4>'+
//    '<div class="row">'+
//    '<div class="col-xs-5">'+
//    '<img src="../images/repeat9.png">'+
//    '</div>'+
//    '<div class="col-xs-7">'+
//    '<h4>Repeats the blocks in this "Repeat" block 9 times. The "Repeat" block is useful when you want to run the same code again and again. You can connect the "Walk" and "Jump" blocks inside it. You can also change the number of times you want to repeat the code.</h4>'+
//    '</div>'+
//    '</div>'+
//    '<div class="row">'+
//    '<div class="col-xs-5">'+
//    '<img src="../images/walk.png">'+
//    '</div>'+
//    '<div class="col-xs-7">'+
//    '<h4>Each Walk block moves the cat one space to the right.</h4>'+
//    '</div>'+
//    '</div>'
//  );
//
//  $("button#newBlockTip").show();
//  $("#newBlockModal .modal-body").html(
//    '<div class="row">'+
//    '<div class="col-xs-5">'+
//    '<img src="../images/repeat9.png">'+
//    '</div>'+
//    '<div class="col-xs-7">'+
//    '<h3>The "Repeat" block makes the cat repeat whatever blocks are connected inside of it.</h3>'+
//    '</div>'+
//    '</div>'
//  );
//
//  //Insert Start block in workspace
//  InsertBlock("start", 200, 20, false, true);
//
//  redraw();
//}

function CheckSuccess() {
  //alert("RUNNING!!!!!!!!!!!!!! CHECKSUCCESS!!!!!!!!!");

  animationsArray.push(setTimeout(runCheck, 200));

  function runCheck() {
    if (player.x == target.x && Math.abs(player.y - target.y) < 5) {
      textSize(32);
      text("Correct", 10, 30);
      fill(0, 102, 153);
      $("#successModal").modal("show");

      if (!$.isEmptyObject(CURRENT_USER)) {
        console.log("Updating maxLevel");
        CURRENT_USER.set(
          "maxLevel",
          Math.max(currentLevel + 1, CURRENT_USER.attributes.maxLevel)
        );
        CURRENT_USER.save();
        UnlockLevels(CURRENT_USER.maxLevel);

        console.log("Level completed");
        console.log(currentLevel);

        var LevelCompleted = Parse.Object.extend("LevelCompleted");
        var levelCompleted = new LevelCompleted();

        var blocksUsed = Blockly.mainWorkspace.getAllBlocks();
        var totalBlocksUsed = blocksUsed.length;
        //Take away the embedded blocks
        blocksUsed.forEach(function (element, index, array) {
          if (
            element.type === "target" ||
            element.type === "logic_negate" ||
            element.type === "empty" ||
            element.type === "empty_cell" ||
            element.type === "empty_cell_left" ||
            element.type === "empty_cell_right" ||
            element.type === "obstacle"
          ) {
            console.log("Minus " + element.type);
            totalBlocksUsed--;
          }
        });

        console.log("Blocks used to solve problem: " + totalBlocksUsed);

        levelCompleted.set("level", currentLevel);
        levelCompleted.set("blocksUsed", totalBlocksUsed);
        levelCompleted.set("codeUsed", Blockly.JavaScript.workspaceToCode());
        levelCompleted.set("time", new Date());
        levelCompleted.set("UserId", CURRENT_USER.id);
        levelCompleted.save();
      }
      //var currentPlayer = Parse.User.current().id;
      //var Levels = Parse.Object.extend("Levels");
      //var query = new Parse.Query(Levels);
      //query.equalTo("UserId", currentPlayer);
      //query.first({
      //  success: function(object) {
      //
      //    console.log(object);
      //    if(typeof object !== "undefined"){
      //      maxLevel = object.get("MaxLevel");
      //      CURRENT_USER.maxLevel = Math.max(currentLevel+1, CURRENT_USER.maxLevel);
      //      var levels = new Parse.Object("Levels");
      //      levels.set("UserId", Parse.User.current().id);
      //      levels.set("MaxLevel", CURRENT_USER.maxLevel);
      //      levels.save();
      //    }else{
      //      alert("Please login");
      //    }
      //
      //    UnlockLevels(CURRENT_USER.maxLevel);
      //  },
      //  error: function(error) {
      //    alert("Error: " + error.code + " " + error.message);
      //  }
      //});
    } else {
      $modal = $(".tipModal");
      console.log($modal);
      console.log($modal.hasClass("in"));
      if (!$(".tipModal").hasClass("in")) {
        console.log("Show tip modal");
        //console.log($('.tipModal').hasClass('in'));
        console.log("Hint modal requested from failure");
        console.log(tipToShow);
        if (!$.isEmptyObject(CURRENT_USER)) {
          var HintProvided = Parse.Object.extend("HintProvided");
          var hintProvided = new HintProvided();
          hintProvided.set("HintId", tipToShow > totalNumTips ? 1 : tipToShow);
          hintProvided.set("Level", currentLevel);
          hintProvided.set("time", new Date());
          hintProvided.set("UserId", CURRENT_USER.id);
          hintProvided.save();
        }

        displayTip();
      }
    }

    //Clear animations array
    animationsArray = [];
  }
}

function GetBlock(name) {
  return Blockly.Block.obtain(Blockly.mainWorkspace, name);
}

function InsertBlock(name, x, y, deletable, movable) {
  var newBlockStart = Blockly.Block.obtain(Blockly.mainWorkspace, name);
  newBlockStart.initSvg();
  newBlockStart.moveTo(x, y);
  newBlockStart.setDeletable(deletable);
  newBlockStart.setMovable(movable);
  newBlockStart.render();

  //Insert 2 blocks and connect them in workspace
  //var newBlock1 = Blockly.Block.obtain(Blockly.mainWorkspace,"repeat_until");
  //newBlock1.initSvg();
  //newBlock1.render();
  //newBlock1.moveTo(80,100);
  //
  //var newBlock2 = Blockly.Block.obtain(Blockly.mainWorkspace,"obstacle");
  //newBlock2.initSvg();
  //newBlock2.render();
  //newBlock2.moveTo(100,100);
  //
  //newBlock1.getConnections_()[2].connect(newBlock2.getConnections_()[0]);
}

var invalidState = false;

function CheckInvalidStates() {
  //console.log("CHECKING INVALID STATES");
  if (obstacles.length > 0) {
    for (var i = 0; i < obstacles.length; i++) {
      if (
        obstacles[i].x == player.x &&
        Math.abs(obstacles[i].y - player.y) < 2
      ) {
        //Stop all animations
        invalidState = true;

        //Display failed state modal
        console.log("INVALID STATE!!!");
      }
    }
  }

  //Check if player out of bounds
  if (player.x > $("#p5Container canvas").width()) {
    console.log("Invalid state, player out of canvas");
    invalidState = true;
  }

  if (invalidState) {
    console.log(animationsArray.length);
    while (animationsArray.length > 0) {
      clearTimeout(animationsArray.pop());
    }
    CheckSuccess();
    return;
  }
}

function Retry() {
  ReloadLevel();
  animationsArray = [];
  redraw();
}

function displayTip() {
  if (tipToShow <= totalNumTips) {
    $("#tipModal" + tipToShow).modal("show");
    tipToShow++;

    //if(!$.isEmptyObject(CURRENT_USER)){
    //  var Tip = Parse.Object.extend("Tip");
    //  var tip = new Tip();
    //  tip.set("UserId", Parse.User.current().id);
    //  tip.save();
    //}
  } else {
    tipToShow = 1;
    displayTip();
  }

  //if(tipToShow == 0){
  //    tipToShow = 1;
  //    $("#tipModal1").modal("show");
  //    if(!$.isEmptyObject(CURRENT_USER)){
  //        var Tip = Parse.Object.extend("Tip");
  //        var tip = new Tip();
  //        tip.set("UserId", Parse.User.current().id);
  //        tip.save();
  //    }
  //}else if(tipToShow == 1){
  //    tipToShow = 0;
  //    $("#tipModal2").modal("show");
  //    if(!$.isEmptyObject(CURRENT_USER)){
  //        var Tip = Parse.Object.extend("Tip");
  //        var tip = new Tip();
  //        tip.set("UserId", Parse.User.current().id);
  //        tip.save();
  //    }
  //}else{
  //    alert("Error");
  //}
}

// API FOR BLOCKLY
function Walk() {
  player.move();
}

function Forward() {
  player.forward();
}

function TurnRight() {
  player.turnRight();
}

function TurnLeft() {
  player.turnLeft();
}

function Jump() {
  player.jump();
}

function LongJump() {
  player.long_jump();
}

function SuperJump() {
  player.super_jump();
}
/**
 * @return {boolean}
 */
function TargetBlock() {
  if (player.x == target.x && Math.abs(player.y - target.y) < 5) {
    return true;
  }

  return false;
}

/**
 * @return {boolean}
 */
function ObstacleBlock() {
  var walkDist = player.x + player.total_hor_dist_walk;
  for (var i = 0; i < obstacles.length; i++) {
    if (
      walkDist == obstacles[i].x &&
      !StackedObstacleBlock() &&
      !DoubleObstacleBlock()
    ) {
      return true;
    }
  }
  return false;

  //return player.x + player.total_hor_dist_walk < 250;
}

function DoubleObstacleBlock() {
  var walkDist = player.x + player.total_hor_dist_walk;
  var walkDistDouble = player.x + player.total_hor_dist_walk * 2;

  for (var i = 0; i < obstacles.length; i++) {
    if (walkDist == obstacles[i].x) {
      for (var j = 0; j < obstacles.length; j++) {
        if (walkDistDouble == obstacles[j].x) {
          return true;
        }
      }
    }
  }
  return false;

  //return player.x + player.total_hor_dist_walk < 250;
}

function StackedObstacleBlock() {
  var walkDist = player.x + player.diameter;
  var heightDistDouble = player.y - player.diameter;

  for (var i = 0; i < obstacles.length; i++) {
    if (walkDist == obstacles[i].x) {
      //Is there an obstacle at ground level

      for (var j = 0; j < obstacles.length; j++) {
        if (
          Math.abs(heightDistDouble - obstacles[j].y) < 5 &&
          walkDist == obstacles[j].x
        ) {
          //Is there a stacked obstacle. Use < to account for height variations on jump animations
          console.log("j: " + j);
          console.log(
            "Obstacle X: " + obstacles[j].x + " Y: " + obstacles[j].y
          );
          console.log("Player X: " + player.x + " Y: " + player.y);
          console.log(
            "walkDist: " + walkDist + " heightDistDouble: " + heightDistDouble
          );
          return true;
        }
      }
    }
  }
  return false;

  //return player.x + player.total_hor_dist_walk < 250;
}

function EmptyBlock() {
  var walkDist = player.x + player.total_hor_dist_walk;
  var lastEmtpySpaceX = numSteps * player.diameter + player.init_x;
  for (var i = 0; i < obstacles.length; i++) {
    if (walkDist == obstacles[i].x || walkDist > lastEmtpySpaceX) {
      return false;
    }
  }
  return true;
}

function EmptyCellBlock() {
  if (player.angle == 0 || player.angle == 360) {
    var walkDist = player.x + player.total_hor_dist_walk;
    for (var i = 0; i < obstacles.length; i++) {
      if (walkDist == obstacles[i].x && player.y == obstacles[i].y) {
        return false;
      }
    }
  } else if (player.angle == 90) {
    var walkDist = player.y + player.total_hor_dist_walk;
    for (var i = 0; i < obstacles.length; i++) {
      if (walkDist == obstacles[i].y && player.x == obstacles[i].x) {
        return false;
      }
    }
  } else if (player.angle == 180) {
    var walkDist = player.x - player.total_hor_dist_walk;
    for (var i = 0; i < obstacles.length; i++) {
      if (walkDist == obstacles[i].x && player.y == obstacles[i].y) {
        return false;
      }
    }
  } else if (player.angle == 270) {
    var walkDist = player.y - player.total_hor_dist_walk;
    for (var i = 0; i < obstacles.length; i++) {
      if (walkDist == obstacles[i].y && player.x == obstacles[i].x) {
        return false;
      }
    }
  }

  return true;
}

function EmptyCellBlockLeft() {
  if (player.angle == 0 || player.angle == 360) {
    var walkDist = player.y - player.total_hor_dist_walk;
    for (var i = 0; i < obstacles.length; i++) {
      if (player.x == obstacles[i].x && walkDist == obstacles[i].y) {
        return false;
      }
    }
  } else if (player.angle == 90) {
    var walkDist = player.x + player.total_hor_dist_walk;
    for (var i = 0; i < obstacles.length; i++) {
      if (player.y == obstacles[i].y && walkDist == obstacles[i].x) {
        return false;
      }
    }
  } else if (player.angle == 180) {
    var walkDist = player.y + player.total_hor_dist_walk;
    for (var i = 0; i < obstacles.length; i++) {
      if (walkDist == obstacles[i].y && player.x == obstacles[i].x) {
        return false;
      }
    }
  } else if (player.angle == 270) {
    var walkDist = player.x - player.total_hor_dist_walk;
    for (var i = 0; i < obstacles.length; i++) {
      if (walkDist == obstacles[i].x && player.y == obstacles[i].y) {
        return false;
      }
    }
  }

  return true;
}

function EmptyCellBlockRight() {
  if (player.angle == 0 || player.angle == 360) {
    var walkDist = player.y + player.total_hor_dist_walk;
    for (var i = 0; i < obstacles.length; i++) {
      if (walkDist == obstacles[i].y && player.x == obstacles[i].x) {
        return false;
      }
    }
  } else if (player.angle == 90) {
    var walkDist = player.x - player.total_hor_dist_walk;
    for (var i = 0; i < obstacles.length; i++) {
      if (walkDist == obstacles[i].x && player.y == obstacles[i].y) {
        return false;
      }
    }
  } else if (player.angle == 180) {
    var walkDist = player.y - player.total_hor_dist_walk;
    for (var i = 0; i < obstacles.length; i++) {
      if (walkDist == obstacles[i].y && player.x == obstacles[i].x) {
        return false;
      }
    }
  } else if (player.angle == 270) {
    var walkDist = player.x + player.total_hor_dist_walk;
    for (var i = 0; i < obstacles.length; i++) {
      if (walkDist == obstacles[i].x && player.y == obstacles[i].y) {
        return false;
      }
    }
  }

  return true;
}

function TargetReached() {
  !(player.x == target.x);
}

var $output = $("#codeEvalOutput");
var $iframe = $("iframe");

function displayBlockOutput(block, text) {
  var $iframeWidth = $iframe.width();
  var $iframeOffset = $iframe.offset();
  var position = block.getRelativeToSurfaceXY();
  //var blockWidth = block.getHeightWidth().width;
  var blockWidth = block.svg_.width;
  var toolboxWidth = Math.abs(Blockly.getMainWorkspaceMetrics_().viewLeft);
  //console.log("Iframe position from displayBlockOutput: " + $iframeOffset.left + ", " + $iframeOffset.top);
  console.log(
    "Block position from displayBlockOutput: $iframeOffset.left: " +
      $iframeOffset.left +
      " X: " +
      position.x +
      ", Y: " +
      position.y +
      ", width: " +
      blockWidth +
      ", toolboxWidth: " +
      toolboxWidth
  );
  $output.text(text);
  $output.css({
    top: $iframeOffset.top + position.y + 15,
    left: $iframeOffset.left + toolboxWidth + position.x + blockWidth,
  });
  $output.show();
  setTimeout(hideOutput, 500);

  function hideOutput() {
    $output.hide();
  }
}

function sleep(ms) {
  var start = new Date().getTime(),
    expire = start + ms;
  while (new Date().getTime() < expire) {}
  return;
}
