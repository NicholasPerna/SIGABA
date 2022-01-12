

function linearSearch(array, toFind) {
    for (let i = 0; i < array.length; i++) {
        if (array[i] === toFind)
            return i;
    }
    return -1;
}


//THESE ARE THE SAME EACH TIME:
//inner wirings for cipher and control rotors (rand num 0 to 25):
var Cwiring0 = [6, 11, 25, 22, 24, 23, 10, 17, 16, 7, 9, 8, 19, 21, 12, 1, 4, 5, 3, 2, 0, 20, 15, 14, 18, 13];
var Cwiring1 = [22, 10, 20, 25, 14, 6, 9, 16, 4, 15, 23, 3, 12, 7, 13, 0, 1, 17, 24, 11, 2, 21, 5, 19, 8, 18];
var Cwiring2 = [9, 3, 23, 2, 8, 13, 11, 6, 10, 24, 15, 21, 25, 17, 14, 16, 5, 19, 1, 7, 18, 0, 4, 20, 12, 22];
var Cwiring3 = [21, 12, 8, 16, 19, 5, 18, 20, 9, 24, 4, 23, 11, 2, 22, 15, 13, 1, 25, 3, 10, 0, 17, 6, 7, 14];
var Cwiring4 = [16, 15, 20, 1, 4, 0, 17, 2, 12, 6, 18, 3, 8, 22, 24, 9, 7, 10, 25, 14, 23, 13, 11, 19, 21, 5];
var Cwiring5 = [19, 2, 16, 15, 24, 7, 22, 21, 1, 9, 5, 14, 6, 8, 12, 3, 11, 20, 25, 13, 23, 4, 18, 0, 10, 17];
var Cwiring6 = [7, 4, 18, 11, 20, 22, 23, 6, 9, 14, 10, 5, 12, 19, 1, 8, 2, 16, 0, 24, 17, 15, 3, 25, 21, 13];
var Cwiring7 = [8, 19, 1, 14, 20, 4, 16, 12, 23, 13, 25, 3, 22, 21, 5, 18, 0, 9, 2, 15, 11, 6, 17, 7, 24, 10];
var Cwiring8 = [6, 18, 8, 2, 16, 12, 13, 22, 9, 10, 4, 17, 3, 19, 11, 21, 15, 14, 23, 7, 20, 25, 1, 5, 0, 24];
var Cwiring9 = [3, 14, 22, 16, 10, 15, 23, 19, 4, 18, 24, 11, 0, 6, 20, 12, 2, 1, 9, 21, 17, 13, 25, 8, 5, 7];

var Cwirings = [Cwiring0, Cwiring1, Cwiring2, Cwiring3, Cwiring4, Cwiring5, Cwiring6, Cwiring7, Cwiring8, Cwiring9];

//inner wirings for index rotors (rand num 0 1o 9):
var Iwiring0 = [0, 7, 4, 6, 9, 5, 8, 2, 1, 3];
var Iwiring1 = [1, 7, 3, 9, 5, 8, 0, 4, 6, 2];
var Iwiring2 = [5, 7, 4, 8, 0, 6, 2, 3, 1, 9];
var Iwiring3 = [9, 4, 6, 2, 0, 3, 7, 8, 1, 5];
var Iwiring4 = [5, 0, 6, 8, 2, 4, 3, 7, 9, 1];

var Iwirings = [Iwiring0, Iwiring1, Iwiring2, Iwiring3, Iwiring4];


//current values of the cipher wheels
var cipher_wheel0 = [];
var cipher_wheel1 = [];
var cipher_wheel2 = [];
var cipher_wheel3 = [];
var cipher_wheel4 = [];

//current values of the control wheels
var control_wheel0 = [];
var control_wheel1 = [];
var control_wheel2 = [];
var control_wheel3 = [];
var control_wheel4 = [];

//current values of the index wheels
var index_wheel0 = [];
var index_wheel1 = [];
var index_wheel2 = [];
var index_wheel3 = [];
var index_wheel4 = [];
//---------------------------------------------------------------------------------------------//


//---------------------------------------------------------------------------------------------//
//THESE CHANGE PER USER CONFIG:
//identify which rotors are sitting where
var control_rotors = [0, 1, 2, 3, 4];
var cipher_rotors = [5, 6, 7, 8, 9];
var index_rotors = [0, 1, 2, 3, 4];

//which digit is on top of each rotor
var cipher_tops = [1, 3, 5, 7, 9];
var control_tops = [0, 2, 4, 6, 8];
var index_tops = [0, 1, 2, 3, 4];
//...or...we might want to keep an entire array so we can talk reference each char

//the orientation of each wheel (1 = step forward A>B -1= step backward B>A]
var Cwheel_orientation = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1];
var Iwheel_orientation = [-1, -1, -1, -1, -1];
//---------------------------------------------------------------------------------------------//


//---------------------------------------------------------------------------------------------//
//BEGIN ENCRYPTION
var plainText;
plainText = A;
//... do the translation ...
var plainNum;
plainNum = 0;



//figure out what the order of the wheel is (do this every time a letter is encoded)
var i;
for (i = 0; i < 26; i += 1) {
    //update all the cipher rotors:
    cipher_wheel0[i] = (cipher_tops[0] + i) % 26;
    cipher_wheel1[i] = (cipher_tops[1] + i) % 26;
    cipher_wheel2[i] = (cipher_tops[2] + i) % 26;
    cipher_wheel3[i] = (cipher_tops[3] + i) % 26;
    cipher_wheel4[i] = (cipher_tops[4] + i) % 26;

    //update all the control rotors:
    control_wheel0[i] = (control_tops[0] + i) % 26;
    control_wheel1[i] = (control_tops[1] + i) % 26;
    control_wheel2[i] = (control_tops[2] + i) % 26;
    control_wheel3[i] = (control_tops[3] + i) % 26;
    control_wheel4[i] = (control_tops[4] + i) % 26;

    //update all the index rotors:
    index_wheel0[i] = (index_tops[0] + i) % 10;
    index_wheel1[i] = (index_tops[1] + i) % 10;
    index_wheel2[i] = (index_tops[2] + i) % 10;
    index_wheel3[i] = (index_tops[3] + i) % 10;
    index_wheel4[i] = (index_tops[4] + i) % 10;
}

cipher_bank = [cipher_wheel0, cipher_wheel1, chipher_wheel2, cipher_wheel3, cipher_wheel4];

//send F, G, H, I in to the control rotor
var mapped = 5;

pos_of_F = linearsearch(cipher_bank[4], 5);
console.log(pos_of_F);


//for (i = 0; i < 5; i++) {
  //  mapped = cipherwheel[i][mapped];
   // console.log();
//}







console.log('Hello world');
