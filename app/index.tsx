import {Button, StyleSheet, Text, View} from "react-native";
import React, {useState} from "react";
import {LinearGradient} from "expo-linear-gradient";
import Animated, {FadeIn, FadeOut} from "react-native-reanimated";

const stepText = ["Welcome to my portfolio", "I'm Telmo Reis", "I'm a React Native Developer"]

// Define the props type
interface StepComponentProps {
    step: number; // Current step index
    stepText: string[]; // Array of step text strings
}

export default function Index() {
    const [step, setStep] = useState(0);

    const handleChangeStep = (operation: string) => {
        setStep((prevStep) => {
            const newStep = operation === "next" ? Math.min(prevStep + 1, 2) : Math.max(prevStep - 1, 0); // Ensure step is within bounds
            return newStep;
        });
    };

    const StepComponent: React.FC<StepComponentProps> = ({step, stepText}) => {
        return (
            <Animated.View entering={FadeIn} exiting={FadeOut}>
                <Text style={styles.stepText}>{stepText[step]}</Text>
            </Animated.View>
        )

    };

    return (
        <View style={styles.container}>
            {/* Static gradient with the same hardcoded color */}
            <LinearGradient
                colors={["rgba(179,179,113,1)", "rgba(60,179,113,1)"]} // A single color applied to the gradient
                style={styles.gradientContainer}
            />

            {/* Step Content */}

            <StepComponent step={step} stepText={stepText}/>

            {/* Buttons for Switching Steps */}
            <Button onPress={() => handleChangeStep("next")} title="Next"/>
            <Button onPress={() => handleChangeStep("prev")} title="Prev"/>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    gradientContainer: {
        ...StyleSheet.absoluteFillObject, // Fill the screen with the gradient
    },
    stepText: {
        fontSize: 24,
        fontWeight: "bold",
        color: "white",
        marginBottom: 20,
    },
});