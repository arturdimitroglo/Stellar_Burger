import React, { useEffect } from "react";
import styles from "./order-list.module.css";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../hook/hook";
import IngredientImage from "../../components/ingredient-image/ingredient-image";
import { fetchOrdersThunk } from "../../services/actions/ws-orders";
import { selectOrderById } from "../../services/reducers/ws-orders";
import { IIngredient } from "../../utils/types";
import { useModifyOrders } from "../../hook/useModifyOrders";

interface IOrderDetails {
  style?: React.CSSProperties;
}

export const OrderReadyStatus = {
  PENDING: "pending",
  DONE: "done",
};

export const OrderStatusOutput = {
  PENDING: "Готовится",
  DONE: "Выполнен",
};

const OrderList = ({ style }: IOrderDetails) => {
  const dispatch = useAppDispatch();
  const { id } = useParams();
  
  const ordersFromSockets = useAppSelector(selectOrderById(id));
  const ingredientAll = useAppSelector(state => state.ingredientSlice.ingredients);
  const foundIngredients = ordersFromSockets?.ingredients.map((orderIngredient: string) => ingredientAll.find((ingredient: IIngredient) => ingredient._id === orderIngredient))

  const calculateSum = (): number => {
    let sum = 0;
    foundIngredients?.forEach((ingredient: IIngredient | undefined) => {
      const orderedIngredient = ingredientAll.find((orderIngredient: IIngredient) => orderIngredient?._id === ingredient?._id)
      if (orderedIngredient?.price) {
        sum += orderedIngredient.price
      }
    })
    return sum
  }

  useEffect(() => {
    if (!ordersFromSockets) {
      dispatch(fetchOrdersThunk());
    }
  }, [ordersFromSockets]);

  useModifyOrders();

  if (!ordersFromSockets) {
    return null;
  }

  const orderStatus =
    ordersFromSockets.status.toUpperCase() as keyof typeof OrderStatusOutput;

  return (
    <div style={style} className={styles.root}>
      <p
        className="text text_type_digits-default mb-10"
        style={{ textAlign: "start" }}
      >
        #{ordersFromSockets.number}
      </p>

      <h1 className="text text_type_main-medium mb-3">
        {ordersFromSockets.name}
      </h1>

      <p className="text text_type_main-default mb-15">
        {OrderStatusOutput[orderStatus]}
      </p>

      <p className="text text_type_main-medium mb-6">Состав:</p>

      <ul className={`${styles.list} custom-scroll mb-10`}>
        {ordersFromSockets.modifiedIngredients?.map((ing, i) => (
          <li key={ing.id} className={styles.ingredient}>
            <IngredientImage
              key={`${ing.id}-${ordersFromSockets._id}-${i}`}
              style={{ margin: 0 }}
              src={ing.img}
              renderDiv
            />

            <p className={`${styles.title} text text_type_main-default ml-4 mr-4`}>
              {ing.name}
            </p>

            <p className={styles.priceContainer}>
              <span className="text text_type_main-default mr-2">
                {ing.qty} x {ing.price}
              </span>{" "}
              <CurrencyIcon type="primary" />
            </p>
          </li>
        ))}
      </ul>

      <div className={styles.info}>
        <time className="text text_type_main-default text_color_inactive">
          Вчера, 13:50 i-GMT+3
        </time>

        <div style={{ marginLeft: "auto" }} className={styles.priceContainer}>
          <span className="text text_type_main-default mr-2">
            {calculateSum()}
          </span>{" "}

          <CurrencyIcon type="primary" />
        </div>
      </div>
    </div>
  );
};

export default OrderList;
