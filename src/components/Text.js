import React from "react";
import { Dimensions } from "react-native";
import styled from "styled-components/native";

export default TextStyle = ({ ...props }) => {
    return <Text {...props}>{props.children}</Text>;
};

const windowHeight = Dimensions.get("window").height;

const Text = styled.Text`
    color: ${(props) => props.color ?? "#000000"};
    margin: ${(props) => props.margin ?? 0};
    padding: ${(props) => props.padding ?? 0};

    ${({ title, large, medium, small, tiny }) => {
        switch (true) {
            case title:
                return "font-size: " + (windowHeight / 14).toString() + "px;";

            case large:
                return "font-size: " + (windowHeight / 20).toString() + "px;";

            case medium:
                return "font-size: " + (windowHeight / 28).toString() + "px;";

            case small:
                return "font-size: " + (windowHeight / 37).toString() + "px;";

            case tiny:
                return "font-size: " + (windowHeight / 50).toString() + "px;";

            default:
                return "font-size: " + (windowHeight / 28).toString() + "px;";
        }
    }}

    ${({ light, semi, bold, heavy }) => {
        switch (true) {
            case light:
                return "font-weight: 300;";

            case semi:
                return "font-weight: 400;";

            case bold:
                return "font-weight: 500;";

            case heavy:
                return "font-weight: 700;";

            default:
                return "font-weight: 400;";
        }
    }}

    ${({ center, right }) => {
        switch (true) {
            case center:
                return "text-align: center;";

            case right:
                return "text-align: right;";

            default:
                return "text-align: left;";
        }
    }}
`;
