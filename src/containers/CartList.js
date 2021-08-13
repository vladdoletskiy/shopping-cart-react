import React from 'react';
import { useSelector } from 'react-redux';
import {
    selectCart
} from '../store/cartSlice';
import Cart from '../components/Cart';
import { selectGoods } from '../store/goodsSlice';
 


/**
 * get data from store
 * list data
 */
function CartList() {
    const cart = useSelector(selectCart);
    const goods = useSelector(selectGoods)
    
    
    const goodsObj = goods.reduce((accum, item) => {
        accum[item['articul']] = item;
        return accum;
    }, {});


    let sum = 0;
    Object.keys(cart).map(item => sum += goodsObj[item]['cost'] * cart[item]);
    console.log(sum);

    return (
		<>
		{/* cюда перенес таблицу. Ведь заголовок один раз должен добавляться */}
			<table>
			<tbody>
			<tr>
				<td className='tdtable'>Фрукты</td>
				<td className='tdtable'>Изображение</td>
				<td className='tdtable'>Цена</td>
				<td className='tdtable'>Количество</td>
				<td className='tdtable'>Общая стоимость</td>
                
			</tr>
			{Object.keys(cart).map(item => <Cart key={item} articul={item} />)}
			</tbody>
            
			</table>
            <div className='total'> Итого: {sum} </div>
		</>
	);

}

export default CartList;


   