import React from "react";
import { Dimensions } from "react-native";
import styled from "styled-components";

export default TextStyle = ({ ...props }) => {
    return <Text {...props}>{props.children}</Text>;
};

const windowWidth = Dimensions.get("window").width;

const Text = styled.Text`
    color: ${(props) => props.color ?? "#1c4068"};
    margin: ${(props) => props.margin ?? 0};

    ${({ title, large, medium, small, tiny }) => {
        switch (true) {
            case title:
                return "font-size: " + (windowWidth / 8).toString() + "px;";

            case large:
                return "font-size: " + (windowWidth / 12).toString() + "px;";

            case medium:
                return "font-size: " + (windowWidth / 16).toString() + "px;";

            case small:
                return "font-size: " + (windowWidth / 20).toString() + "px;";

            case tiny:
                return "font-size: " + (windowWidth / 26).toString() + "px;";

            default:
                return "font-size: " + (windowWidth / 16).toString() + "px;";
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
