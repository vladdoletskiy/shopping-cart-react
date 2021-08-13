import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectGoods } from '../store/goodsSlice';
import { deletCart, selectCart } from '../store/cartSlice';
import { minus } from '../store/cartSlice';




function Cart(props) {
    const goods = useSelector(selectGoods)
	const cart = useSelector(selectCart)
	const articul = props['articul'];
    const dispatch = useDispatch();

    const goodsObj = goods.reduce((accum, item) => {
        accum[item['articul']] = item;
        return accum;
    }, {});

   
    


    const minusFunc = event => {
		event.preventDefault();
		let t = event.target;
        if (!t.classList.contains('minus-cart')) return true;
		// !!!!!!!!!!!!!!! передаем сюда articul с кнопки!!!!
		dispatch(minus(event.target.dataset['key']));
	}

    const delCart = event => {
        event.preventDefault();
        let t = event.target;
        if (!t.classList.contains('del-cart')) return true;
		dispatch(deletCart(event.target.dataset['key']));
    }

    


    return (
         <tr>
					<td>{goodsObj[articul]['title']}</td>
					<td><img className='cart-items' src={goodsObj[articul]['image']} /></td>
					<td>{goodsObj[articul]['cost']}</td>
					<td>{cart[articul]}</td>
					<td>{cart[articul]*goodsObj[articul]['cost']}</td>
					<td><button
							className='minus-cart'
							data-key={articul}
							onClick={minusFunc}
						>
							-
						</button>
                        <button
							className='del-cart'
							data-key={articul}
							onClick={delCart}
						>
							del
						</button></td>
				</tr>
    );
}

export default Cart;

// Задача компонента - возвращать таблицу где строками будет добавленный в корзину товар, 
// а столбцы должны быть следующие: название товара, цена ( за единицу), количество, 
// стоимость всего товара. Также в строке должны идти кнопки минус 
// (уменьшить количество товара на 1) и удалить( удалить товар из корзины).