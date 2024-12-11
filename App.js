//IM/2021/035
//Sampath R.L.L.T.


import React, { useState } from "react";
import {
  StyleSheet,    //useto tyle the app
  Text,   
  View,   //container component
  TouchableOpacity,   //useto create interactive btn
  ScrollView,     // to enable sclolle UI
  PanResponder,       //use to swipipe(history eka)
} from "react-native";

export default function App() {
  //declare state variable
  const [input, setInput] = useState("");    // itentyfy current input string
  const [result, setResult] = useState("");      // display calculated result
  const [history, setHistory] = useState([]);    // array for store history
  const [showHistory, setShowHistory] = useState(false);   // change the visiblity of history

//history
  //panresponder for handle swipe gesture to show history
  const panResponder = PanResponder.create({
    onMoveShouldSetPanResponder: (_, gestureState) =>
      gestureState.dx > 50 && Math.abs(gestureState.dy) < 30, // use to detect  swipe from right
    onPanResponderRelease: () => setShowHistory(true), // Show history when right swipe
  });

//handle button press
  //function for handle btn presses
  const handlePress = (value) => {
    const operators = ["+", "-", "*", "/", "%"];  

//Clear btn  
    if (value === "C") {
      setInput("");   //clear input
      setResult("");    //clear result
    } 
//del btn
    else if (value === "DEL")  {
      setInput(input.slice(0, -1));  //delete last character of input
    }
    
    else if (value === "=") {

//calculation part when press ""=""
      //when "=" is pressed calculate the result
      try {
        if (input.includes("/0")) {      //check is devide by zero
          setResult("Can't divide by zero");   //prevent devide by zero
          setInput("");

        } else {
//handling presentage calculation
          const sanitizedInput = input.replace("%", "/100");  // convert string % --> /100
          const evalResult = eval(sanitizedInput);      //convert snitized input to js code(treate to input as js code) 
          setResult(evalResult.toString());     // conver eval result to sring again(setResult is like state setter function)

         //accessing the current history   //update history    //create recod of current cal
          setHistory((prevHistory)    =>    [...prevHistory, `${input} = ${evalResult}`]);
        }

      } catch (error) {
        setResult("Error");      //give a error for any invalid input or calculation
      }

//handiling squareroot calculation
    } else if (value === "√") {    //going to calculate square root 

      try {
        const currentValue = input || result || "0";  //asign input or result 
        const sqrtResult = Math.sqrt(eval(currentValue));   //calculating square root
        setResult(sqrtResult.toString());
        setHistory((prevHistory) => [...prevHistory, `√(${currentValue}) = ${sqrtResult}`]);
        setInput("");   //clear input after calculation

      } catch (error) {
        setResult("Error");
      }

//prevent entering operator together
    } else if (operators.includes(value)) {        //check entered is valid operator
      if (operators.includes(input.slice(-1))) {    //check if the the last character input is operator
        setInput(input.slice(0, -1) + value);    //replace last operator with with newly entered
      } else {
        setInput(input + value);      //if the last entered in not an operator
      }
    
//prevent multiple decimal(.)
    } else if (value === ".") {

      // Prevent multiple decimals in the same number
      const parts = input.split(/[\+\-\*\/\%]/);       // Split input by operators
      const lastPart = parts[parts.length - 1];         // Get the current number being entered
  
      if (lastPart.includes(".")) {
        return;          // Ignore additional decimal points in the same number
      }  
      setInput(input + value);     //decimal ading to the input

//result clear and replace new number
    } else {
      if (result !== "" && !operators.includes(value)) {       //
        setInput(value);     //result replace with new number
        setResult("");      //clear result
      } else {
        setInput(input + value);  //adding value to input
      }
    }
  };
  
//history page
  return (

    <View style={styles.container} {...panResponder.panHandlers}>  {/*swipe functionality*/}

      {/*navigate show history page */}
      {showHistory ? (
        
        <ScrollView style={styles.historyContainer}>      
          <Text style={styles.historyHeader}>Calculation History</Text>

          {/*Map through history array and display each item */}
          {history.map((item, index) => (                               
            <Text key={index} style={styles.historyItem}>
              {item}
            </Text>
          ))}

          <TouchableOpacity     //back button for come again calculation page
            style={styles.backButton}
            onPress={() => setShowHistory(false)}
          >
            <Text style={styles.BtnText}>Back</Text>
          </TouchableOpacity>
        </ScrollView>
      ) : (
        <>
          {/* Display */}
          <View style={styles.display}>
            <ScrollView
              horizontal={true}        // Enable horizontal scrolling for a single line
              contentContainerStyle={styles.horizontalScrollContainer}
              showsHorizontalScrollIndicator={false}
              >
              
            </ScrollView>
            <Text style={styles.inputText}>{input}</Text>    {/* User input */}
            <Text style={styles.resultText}>{result}</Text>    {/* Calculation result */}
          </View>

          {/* Buttons */}
          <View style={styles.BtnGrid}>      {/* Btn are grouped into rows for a calculator layout */}

            {/* Row 1 */}
            <View style={styles.row}>
              <TouchableOpacity style={styles.operatorBtn} onPress={() => handlePress("C")}>
                <Text style={styles.BtnText}>C</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.operatorBtn} onPress={() => handlePress("DEL")}>
                <Text style={styles.BtnText}>⌫</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.operatorBtn} onPress={() => handlePress("%")}>
                <Text style={styles.BtnText}>%</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.operatorBtn} onPress={() => handlePress("/")}>
                <Text style={styles.BtnText}>÷</Text>
              </TouchableOpacity>
            </View>

            {/* Row 2 */}
            <View style={styles.row}>
              <TouchableOpacity style={styles.numberBtn} onPress={() => handlePress("7")}>
                <Text style={styles.BtnText}>7</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.numberBtn} onPress={() => handlePress("8")}>
                <Text style={styles.BtnText}>8</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.numberBtn} onPress={() => handlePress("9")}>
                <Text style={styles.BtnText}>9</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.operatorBtn} onPress={() => handlePress("*")}>
                <Text style={styles.BtnText}>×</Text>
              </TouchableOpacity>
            </View>

            {/* Row 3 */}
            <View style={styles.row}>
              <TouchableOpacity style={styles.numberBtn} onPress={() => handlePress("4")}>
                <Text style={styles.BtnText}>4</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.numberBtn} onPress={() => handlePress("5")}>
                <Text style={styles.BtnText}>5</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.numberBtn} onPress={() => handlePress("6")}>
                <Text style={styles.BtnText}>6</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.operatorBtn} onPress={() => handlePress("-")}>
                <Text style={styles.BtnText}>-</Text>
              </TouchableOpacity>
            </View>

            {/* Row 4 */}
            <View style={styles.row}>
              <TouchableOpacity style={styles.numberBtn} onPress={() => handlePress("1")}>
                <Text style={styles.BtnText}>1</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.numberBtn} onPress={() => handlePress("2")}>
                <Text style={styles.BtnText}>2</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.numberBtn} onPress={() => handlePress("3")}>
                <Text style={styles.BtnText}>3</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.operatorBtn} onPress={() => handlePress("+")}>
                <Text style={styles.BtnText}>+</Text>
              </TouchableOpacity>
            </View>

            {/* Row 5 */}
            <View style={styles.row}>
              <TouchableOpacity style={styles.numberBtn} onPress={() => handlePress("√")}>
                <Text style={styles.BtnText}>√</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.numberBtn} onPress={() => handlePress("0")}>
                <Text style={styles.BtnText}>0</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.numberBtn} onPress={() => handlePress(".")}>
                <Text style={styles.BtnText}>.</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.equalsBtn} onPress={() => handlePress("=")}>
                <Text style={styles.BtnText}>=</Text>
              </TouchableOpacity>
            </View>
          </View>
        </>
      )}
    </View>
  );
}

//style for component
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000000",
    justifyContent: "flex-end",
  },

  display: {
    flex: 1.2,
    justifyContent: "flex-end",
    padding: 20,
    backgroundColor: "#1C1C1C",
  },

  inputText: {
    fontSize: 30, // Adjust size to fit calculations comfortably
    color: "#FFFFFF",
    textAlign: "left",
    flexWrap:"wrap",
    width:"100%",
  },

  horizontalScrollContainer: {
    alignItems: "flex-end", // Align text at the bottom of the display
    flexDirection: "row", // Ensure horizontal layout
  },
  
  resultText: {
    fontSize: 30,
    color: "#888888",
    textAlign: "right",
  },

  historyContainer: {
    flex: 1,
    backgroundColor: "#1C1C1C",
    paddingBlockStart:"70",
    padding: 30,
  },

  historyHeader: {
    fontSize: 24,
    color: "#FFFFFF",
    marginBottom: 10,
  },

  historyItem: {
    fontSize: 18,
    color: "#888888",
    marginBottom: 5,
  },

  backButton: {
    marginTop: 20,
    backgroundColor: "#FF9500",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },

  BtnGrid: {
    padding: 10,
  },

  row: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginVertical: 5,
  },

  numberBtn: {
    flex: 1,
    backgroundColor: "#333333",
    alignItems: "center",
    justifyContent: "center",
    margin: 5,
    height: 60,
    borderRadius: 10,
  },

  operatorBtn: {
    flex: 1,
    backgroundColor: "#FF9500",
    alignItems: "center",
    justifyContent: "center",
    margin: 5,
    height: 60,
    borderRadius: 10,
  },

  equalsBtn: {
    flex: 1,
    backgroundColor: "#34C759",
    alignItems: "center",
    justifyContent: "center",
    margin: 5,
    height: 60,
    borderRadius: 10,
  },

  BtnText: {
    fontSize: 20,
    color: "#FFFFFF",
    fontWeight: "bold",
  },
});
