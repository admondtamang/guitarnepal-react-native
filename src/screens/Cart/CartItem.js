import { AntDesign } from "react-native-vector-icons";
import React from "react";
import { StyleSheet, Image, Text } from "react-native";
import { IconButton, List, Title, Subheading } from "react-native-paper";
import styled from "styled-components";
import { useDispatch } from "react-redux";
export default function CartItem({ item }) {
    const dispatch = useDispatch();
    function onDispatch() {}
    return (
        <Container>
            <Image source={{ uri: item?.images[0]?.src }} style={styles.cartImage} />
            <Description>
                <Subheading style={{ fontWeight: "bold" }}>{item.name}</Subheading>
                <Price>Rs. {item.price}</Price>
                <QuantityContainer>
                    <IconButton background="lightblue" icon="plus" size={18} onPress={() => console.log("Pressed")} />
                    <Subheading>{item.quantity}</Subheading>
                    <IconButton icon="minus" size={18} onPress={() => console.log("Pressed")} />
                </QuantityContainer>
            </Description>
        </Container>
    );
}

const QuantityContainer = styled.View`
    display: flex;
    align-items: center;
    flex-direction: row;
    max-width: 100px;
    /* background-color: lightblue; */
    border-radius: 20;
    justify-content: flex-start;
`;
const Container = styled.View`
    display: flex;
    border-radius: 5;
    justify-content: space-between;
    flex-direction: row;
    padding: 10px;
    background-color: aliceblue;
`;
const Description = styled.View`
    flex-grow: 1;
    margin-left: 10px;
`;

const Price = styled(Subheading)`
    color: grey;
    text-align: left;
`;

const styles = StyleSheet.create({
    cartImage: {
        width: 85,
        height: 90,
        marginBottom: 5,
        borderRadius: 10,
    },
});

// import { AntDesign } from "react-native-vector-icons";
// import React from "react";
// import { StyleSheet, Image, Text } from "react-native";
// import { IconButton, List, Title, Subheading } from "react-native-paper";
// import styled from "styled-components";
// import { INCREASE_CART } from "../../redux/cart/cartSlice";
// import { useDispatch } from "react-redux";
// export default function CartItem({ item }) {
//     const dispatch = useDispatch();

//     return (
//         <Container>
//             <Image source={{ uri: item?.images[0]?.src }} style={styles.cartImage} />
//             <Description>
//                 <Subheading style={{ fontWeight: "bold" }}>{item.name}</Subheading>
//                 <Price>Rs. {item.price}</Price>
//                 <QuantityContainer>
//                     <IconButton background="lightblue" icon="plus" size={18} onPress={() => dispatch(INCREASE_CART())} />
//                     <Subheading>{item.quantity}</Subheading>
//                     <IconButton icon="minus" size={18} onPress={() => dispatch(INCREASE_CART())} />
//                 </QuantityContainer>
//             </Description>
//         </Container>
//     );
// }

// const QuantityContainer = styled.View`
//     display: flex;
//     align-items: center;
//     flex-direction: row;
//     max-width: 100px;
//     /* background-color: lightblue; */
//     border-radius: 20;
//     justify-content: flex-start;
// `;
// const Container = styled.View`
//     display: flex;
//     border-radius: 5;
//     justify-content: space-between;
//     flex-direction: row;
//     padding: 10px;
//     background-color: aliceblue;
// `;
// const Description = styled.View`
//     flex-grow: 1;
//     margin-left: 10px;
// `;

// const Price = styled(Subheading)`
//     color: grey;
//     text-align: left;
// `;

// const styles = StyleSheet.create({
//     cartImage: {
//         width: 85,
//         height: 90,
//         marginBottom: 5,
//         borderRadius: 10,
//     },
// });
