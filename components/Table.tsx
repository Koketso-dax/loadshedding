import React, { useEffect, useContext, useState } from 'react'
import { StatusContext } from '../pages/index'
import { ProvinceContext } from './Provinces'
import { SearchContext } from './Search'
import { TotalContext } from './Search'

function Table() {
	const status = useContext(StatusContext)
	const province = useContext(ProvinceContext)
	const id = useContext(SearchContext)
  const tot = useContext(TotalContext)

	const [table, setTable] = useState(null)

	useEffect(() => {
		if (tot > 1) {
			fetch(
				`http://loadshedding.eskom.co.za/LoadShedding/GetScheduleM/${
					id
				}/${String(status)}/${String(province)}/${tot}`
			)
				.then((data) => data)
				.then((result) => console.log(result))
				.catch((error) => console.log(error))
		}
	})

  if(tot > 1)
	return <div>Table</div>
}

export default Table
