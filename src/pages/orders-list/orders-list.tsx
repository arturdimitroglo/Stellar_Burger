import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../hook/hook";
import { useModifyOrders } from "../../hook/useModifyOrders";
import { selectAccessToken, selectIsForgotPassword } from "../../services/reducers/user";
import { selectOrders, WS_ORDER_ACTIONS } from "../../services/reducers/ws-orders";
import Order from "../order/order";
import styles from './orders-list.module.css'

const OrdersList: React.FC = () => {
  const dispatch = useAppDispatch();
  const isAuthenticated = useAppSelector(selectIsForgotPassword);
  const orders = useAppSelector(selectOrders);
  const accessToken = useAppSelector(selectAccessToken);

  useModifyOrders();
  
  useEffect(() => {
    if (isAuthenticated) {
      dispatch({
        type: WS_ORDER_ACTIONS.wsInit,
        payload: `wss://norma.nomoreparties.space/orders?token=${accessToken}`,
      });
    }

    return () => {
      dispatch({ type: WS_ORDER_ACTIONS.wsClose });
    };
  }, [isAuthenticated]);

  return (
      <div>
        <div className={styles.root}>
          {orders && (
            <ul className={`${styles.list} custom-scroll`}>
              <Outlet/>
              {orders
                .slice()
                .reverse()
                .map((o) => (
                  <Order key={o._id} data={o} />
                ))}
            </ul>
          )}
        </div>
      </div>
  );
};

export default OrdersList;
