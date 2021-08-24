import styled from "styled-components";
import React, { useEffect } from "react";
import { SelectBox as Select } from "./SelectBox";
import { connect } from "react-redux";

const FxCalculator = (props) => {
  const {
    fromValue,
    toValue,
    updateToCurrency,
    updateFromCurrency,
    toCurrency,
    fromCurrency,
    currencyList,
  } = props;

  useEffect(() => {
    props.setCurrencyList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  console.log("currency", toCurrency, fromCurrency);

  const updateFromValue = (value) => {
    if (!isNaN(value)) {
      const convertToFloat = parseFloat(value);
      props.updateFromValue(convertToFloat);
    }
  };

  return (
    <Container>
      <Center>
        <Title>{"Currency Convertor"}</Title>
        <Card>
          <FlexBox>
            <div style={{ flexBasis: "10%" }}>
              <label>{"From"}</label>
            </div>
            <div>
              <NumberBox
                id="fromAmount"
                type="number"
                min="0.00"
                max="10000.00"
                step="0.01"
                value={fromValue}
                onChange={(event) => updateFromValue(event.target.value)}
              />
            </div>
            <SelectBoxWrapper>
              {" "}
              <Select
                id="fromCurrency"
                menuPlacement="top"
                placeholder={"Select Currency"}
                options={currencyList.map((m) => ({ label: m, value: m }))}
                value={
                  typeof fromCurrency !== "object"
                    ? { label: fromCurrency, value: fromCurrency }
                    : fromCurrency
                }
                onChange={(val) => updateFromCurrency(val)}
              />
            </SelectBoxWrapper>
          </FlexBox>
          <FlexBox>
            <div style={{ flexBasis: "10%" }}>
              <label>{"To"}</label>
            </div>
            <div>
              <NumberBox
                id="toAmount"
                type="number"
                min="0.00"
                max="10000.00"
                step="0.01"
                value={toValue}
                onChange={() => alert("Edit Not WOrk for To Field")}
              />
            </div>
            <SelectBoxWrapper>
              {" "}
              <Select
                id="toCurrency"
                options={currencyList.map((m) => ({ label: m, value: m }))}
                placeholder={"Select Currency"}
                value={
                  typeof toCurrency !== "object"
                    ? { label: toCurrency, value: toCurrency }
                    : toCurrency
                }
                onChange={(val) => updateToCurrency(val)}
              />
            </SelectBoxWrapper>
          </FlexBox>
        </Card>
      </Center>
    </Container>
  );
};

const mapStateToProps = (state) => {
  return {
    fromValue: state.fromValue,
    toValue: state.toValue,
    initCrrency: state.initCrrency,
    fromCurrency: state.fromCurrency,
    toCurrency: state.toCurrency,
    currencyList: state.currencyList,
  };
};

const mapDispatchToProps = (dispatch) => {
  debugger;
  return {
    setCurrencyList: () => {
      return dispatch({ type: "GET_CURRENCY_LIST" });
    },
    updateFromValue: (value) =>
      dispatch({ type: "UPDATE_FROM_VALUE", value: value }),
    updateFromCurrency: (value) =>
      dispatch({ type: "UPDATE_FROM_CURRENCY", value: value }),
    updateToCurrency: (value) =>
      dispatch({ type: "UPDATE_TO_CURRENCY", value: value }),
  };
};

const SelectBoxWrapper = styled.div`
width: 183px;
margin-left: 24px;
}
`;
const NumberBox = styled.input`
  width: 183px;
  padding-left: 8px;
  height: 32px;
  border: 2px solid lightgrey;
  outline: 2px solid transparent;
  border-radius: 5px;
  font-size: 16px;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen",
    "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue",
    sans-serif;
  ::-webkit-inner-spin-button,
  ::-webkit-outer-spin-button {
    -webkit-appearance: none;
  }
  :focus-visible {
    border: 2px solid #2684ff;
    outline: solid transparent;
  }
`;
const FlexBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding-bottom: 8px;
`;
const Title = styled.h1``;
const Container = styled.div`
  background: #efefef;
  height: 100vh;
`;
const Center = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  height: inherit;
`;
const Card = styled.div`
  width: 600px;
  height: 300px;
  background: #fefefe;
  box-shadow: 0px 0px 12px #ccc;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  cursor: pointer;
  :hover {
    box-shadow: 0px 0px 12px #aaa;
  }
`;
export default connect(mapStateToProps, mapDispatchToProps)(FxCalculator);
