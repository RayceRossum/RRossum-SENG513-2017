function getStats(txt) {
    // you need to write your own code here
    return {
        nChars: getnChars(),
        nWords: getnWords(),
        nLines: getnLines(),
        nNonEmptyLines: getnNonEmptyLines(),
        averageWordLength: getaverageWordLength(),
        maxLineLength: getmaxLineLength(),
        allPalindromes: getallPalindromes(),
        tenLongestWords: gettenLongestWords(),
        tenMostFrequentWords: gettenMostFrequentWords()
    };

  function getnChars() {
    return document.getElementById("txtarea").value.length;
  }

  function getWords() {
    var text = document.getElementById("txtarea").value;
    var words = text.split(/\s|\+/g);

    var index;
    while ((index = words.indexOf("")) !== -1) {
      words.splice(index, 1);
    }

    words.forEach(function (curVal, index){
      words[index] = curVal.replace(/[\) .?,!:-]+/g," ").trim(); // replaces conflicting special characters but maintains their array allocation, which is consistent for numWords
    });

    return words;
  }

  function getnWords() {
    return getWords().length;
  }

  function getLines() {
    var text = document.getElementById("txtarea").value;
    return text.split(/\r*\n/);
  }

  function getnLines() {
    return getLines().length;
  }

  function getnNonEmptyLines() {
    var lines = getLines()
    var nonEmptyLines = lines;

    lines.forEach(function (curVal, index) {
      if (curVal.search(/\s+/g) === -1) {
        nonEmptyLines.splice(index, 1);
      }
    });

    return nonEmptyLines.length;
  }

  function getaverageWordLength() {
    var words = getWords();

    var index;
    while ((index = words.indexOf("")) !== -1) {
      words.splice(index, 1);
    }

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
    var tenLongest = words.sort(function (a, b) { return b.length - a.length; });

    return tenLongest.slice(0, 10).sort(function (a, b) {
        var returnVal = b - a;
        if (returnVal === 0 && a !== "" && b !== "") {
            var nameA = a.toLowerCase();
            var nameB = b.toLowerCase();

            if (nameA < nameB) {
              return -1;
            }
            if (nameA > nameB) {
              return 1;
            }
            return 0;

        } else {
          return returnVal;
        }
    });
  }

  function gettenMostFrequentWords() {
    var words = getWords().sort();
    var obj = { };
    for (var i = 0, j = words.length; i < j; i++) {
       obj[words[i]] = (obj[words[i]] || 0) + 1;
    }

    var objArray = []
    Object.keys(obj).map(function(objectKey, index) {
      var value = obj[objectKey];
      objArray.push({key : objectKey, val: value});
    });

    objArray = objArray.sort(function (a, b) {
        var returnVal = b.val - a.val;
        if (returnVal === 0 && a.key !== "" && b.key!== "") {
            var nameA = a.key.toLowerCase();
            var nameB = b.key.toLowerCase();

            if (nameA < nameB) {
              return -1;
            }
            if (nameA > nameB) {
              return 1;
            }
            return 0;

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
