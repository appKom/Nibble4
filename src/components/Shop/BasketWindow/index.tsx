import React, { useContext, FC } from "react";
import styled from "styled-components";
import BasketItem from "./BasketItem";
import { OnlineOrange } from "utility/style";
import { StateContext } from "state/state";
import { calculateCartTotal } from "types/inventory";
import Button from "atoms/Button";
import { setModalState } from "state/actions";
import Modal from "components/Shop/Modal";
import { modalTypes } from "types/modal";

const BasketWindow: FC = () => {
  const { state, dispatch } = useContext(StateContext);
  const { cart, user, inventory } = state;

  const totalPrice = calculateCartTotal(cart, inventory);
  const insufficient = user!.balance - totalPrice < 0 ? true : false;

  const purchase = () => {
    if (insufficient || totalPrice <= 0) return undefined;
    return dispatch(setModalState(modalTypes.PURCHASE));
  };

  const basketItems = Object.keys(cart).map((key: string) => (
    <BasketItem
      key={key}
      id={Number(key)}
      quantity={cart[Number(key)].quantity}
    />
  ));

  return (
    <Container>

      <h2>Saldo: {user!.balance}kr</h2>

      <ItemDiv>{basketItems}</ItemDiv>

      <CostDiv>
        <span>
          <b> Sum :</b>
        </span>
        <span id="pris">
          <b> {totalPrice}kr</b>
        </span>
      </CostDiv>
      <Button onClick={purchase}>
        {insufficient ? "Utilstrekkelig med penger" : "Kjøp"}
      </Button>

      <Modal />
    </Container>
  );
};

export default BasketWindow;

const Title = styled.h2`
  margin-left: 20px;
`;

const Container = styled.div`
  display: grid;
  grid-template-rows: 1fr 8fr 1fr 1fr;

  text-align: left;
  background-color: white;
  width: 85%;
  height: 70%;
  border-top: 10px solid ${OnlineOrange};
  border-radius: 3px;
  box-shadow: 2px 2px 7px #888888;
  padding: 5px;
  margin-left: auto;
  margin-right: auto;
`;

const ItemDiv = styled.div`
  ::-webkit-scrollbar {
    width: 8px;
  }
  ::-webkit-scrollbar-thumb {
    background: ${OnlineOrange};
    border-radius: 2px;
  }

  overflow: auto;
`;

const CostDiv = styled.div`
  display: grid;
  grid-template-columns: 5fr 1fr;
  grid-template-rows: 1fr 1fr;

  margin-left: auto;
  margin-right: auto;
  margin-bottom: 10px;
  margin-top: 10px;
  width: 90%;
  text-align: left;
  padding: 5px;
  font-size: 16px;
  border-bottom: 1px dashed gray;
  border-top: 1px dashed gray;
  #olcoins {
    grid-column: 2;
    grid-row: 2;
  }
`;
