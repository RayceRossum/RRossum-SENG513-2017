function getStats(txt) {
    // you need to write your own code here
    return {
        nChars: getnChars(),
        nWords: getnWords(),
        nLines: getnLines(),
        nNonEmptyLines: getnNonEmptyLines(),
        maxLineLength: getmaxLineLength(),
        averageWordLength: getaverageWordLength(),
        allPalindromes: getallPalindromes(),
        tenLongestWords: gettenLongestWords(),
        tenMostFrequentWords: gettenMostFrequentWords()
    };

  function getnChars() {
    return document.getElementById("txtarea").value.length;
  }

  function getWords() {
    var text = document.getElementById("txtarea").value;
    var alphaNumericText = "";
    var regex = new RegExp(/[a-zA-Z0-9]/);

    for (var i = 0; i < text.length; i ++) {
      var character = text.charAt(i);
      if (regex.test(character)) {
        alphaNumericText = alphaNumericText.concat(character)
      } else {
        alphaNumericText = alphaNumericText.concat(" ")
      }
    }

    var words = alphaNumericText.replace(/\s+/g,' ').trim().split(" ");
    return words;
  }

  function getnWords() {
    return getWords().length;
  }

  function getLines() {
    var text = document.getElementById("txtarea").value;
    return text.split(/\r\n|\r|\n/);
  }

  function getnLines() {
    return getLines().length;
  }

  function getnNonEmptyLines() {
    var lines = getLines()
    var nonEmptyLines = [];

    lines.forEach(function (curVal, index) {
      if (curVal.length) {
        nonEmptyLines.push(curVal);
      }
    });

    return nonEmptyLines.length;
  }

  function getaverageWordLength() {
    var words = getWords();

    var totalWordChars = 0;
    words.forEach(function (curVal, index) {
      totalWordChars += curVal.length;
    })

    return totalWordChars/words.length;
  }

  function getmaxLineLength() {
    var lines = getLines();

    var longestLine = 0;
    lines.forEach(function (curVal, index) {
      if (curVal.length > longestLine) {
        longestLine = curVal.length;
      }
    });

    return longestLine;
  }

  function getallPalindromes() {
    var words = getWords();
    var palindromes = [];
    var uniquePalindromes = [];

    words.forEach(function(curVal, index) {
      if (curVal.length > 2) {
        if (curVal.toLowerCase().split("").reverse().join("") === curVal.toLowerCase()) {
          if (!uniquePalindromes.includes(curVal.toLowerCase())){
            uniquePalindromes.push(curVal.toLowerCase());
            palindromes.push(curVal);
          }
        }
      }
    });

    return palindromes;
  }

  function gettenLongestWords() {
    var words = getWords();
    var uniqueWords = [];

    for (var word in words) {
      if (!uniqueWords.includes(words[word])) {
        uniqueWords.push(words[word]);
      }
    }
    var tenLongest = uniqueWords.sort(function (a, b) { return b.length - a.length; });

    // Natural sort modeled after: http://stackoverflow.com/questions/4373018/sort-array-of-numeric-alphabetical-elements-natural-sort/
    return tenLongest.sort(function (a, b) {
        a = a.toLowerCase();
        b = b.toLowerCase();

        var returnVal = b.length - a.length;
        if (returnVal === 0) {
            if (isNaN(a)&&isNaN(b)) return a<b?-1:a==b?0:1;//both are string
            else if (isNaN(a)) return 1;//only a is a string
            else if (isNaN(b)) return -1;//only b is a string
            else return a-b;//both are num
        } else {
          return returnVal;
        }
    }).slice(0, 10);
  }

  function gettenMostFrequentWords() {
    var words = getWords().sort();
    words = words.map(v => v.toLowerCase());

    var obj = { };
    for (var i = 0, j = words.length; i < j; i++) {
       obj[words[i]] = (obj[words[i]] || 0) + 1;
    }

    var objArray = []
    Object.keys(obj).map(function(objectKey, index) {
      var value = obj[objectKey];
      objArray.push({key : objectKey, val: value});
    });

// Natural sort modeled after: http://stackoverflow.com/questions/4373018/sort-array-of-numeric-alphabetical-elements-natural-sort/
    objArray = objArray.sort(function (a, b) {
        var returnVal = b.val - a.val;
        if (returnVal === 0) {
            if (isNaN(a.key)&&isNaN(b.key)) return a.key<b.key?-1:a.key==b.key?0:1;//both are string
            else if (isNaN(a.key)) return 1;//only a is a string
            else if (isNaN(b.key)) return -1;//only b is a string
            else return a.key-b.key;//both are num
        } else {
          return returnVal;
        }
    });

    var returnArray = []

    objArray.slice(0, 10).forEach(function(curVal, index) {
      returnArray.push(curVal.key + "(" + curVal.val + ")");
    });

    return returnArray;
  }
}
