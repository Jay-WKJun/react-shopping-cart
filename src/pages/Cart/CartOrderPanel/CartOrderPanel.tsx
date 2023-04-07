import React, { MouseEvent } from 'react';

import { CartSidePanel } from '@/components';
import { OrderProductList } from '@/containers';
import { useModal } from '@/hooks';
import { routes } from '@/router';
import { TCartStore } from '@/stores/CartContext';
import { useOrderContextApiSelector } from '@/stores/OrderContext';

import { ModalBackgroundStyle, StyledConfirmModal, StyledOrderButton, StyledOrderList } from './CartOrderPanel.styled';

interface CartOrderPanelProps {
  cart: TCartStore;
}

export function CartOrderPanel({ cart }: CartOrderPanelProps) {
  const cartProducts = Object.values(cart);

  const orderContextApis = useOrderContextApiSelector();
  const { Modal, showModal } = useModal();

  const checkedCartProducts = cartProducts.filter((cartProduct) => cartProduct.isChecked);

  const handleOrderButtonClick = (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();

    if (!checkedCartProducts || checkedCartProducts.length <= 0) {
      alert('주문하실 상품을 선택해주세요.');
      return;
    }

    showModal();
  };

  const handleConfirmButtonClick = () => {
    orderContextApis?.dispatch({ type: 'add', payload: checkedCartProducts });
  };

  return (
    <>
      <CartSidePanel
        cart={cart}
        title="결제예상금액"
        body="결제예상금액"
        buttonContent={
          <>
            <span>주문하기</span>
            <span>{`${cartProducts?.length}개`}</span>
          </>
        }
        to={routes.orderList}
        onSubmit={handleOrderButtonClick}
      />

      <Modal className={ModalBackgroundStyle()}>
        <StyledConfirmModal>
          <StyledOrderList>
            <OrderProductList order={checkedCartProducts} />
          </StyledOrderList>
          <StyledOrderButton to={routes.orderList} onClick={handleConfirmButtonClick}>
            확인
          </StyledOrderButton>
        </StyledConfirmModal>
      </Modal>
    </>
  );
}
