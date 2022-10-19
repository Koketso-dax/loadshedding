import React, { useState, useEffect } from 'react'
import { Container, Input, UnorderedList } from '@chakra-ui/react'
import { Suggestion } from './Suggestion'
import Table from './Table'

export const SearchContext = React.createContext(0)
export const TotalContext = React.createContext(0)

function Search(props) {
	const [currentAreas, setAreas] = useState([])
	const [text, setText] = useState('')
	const [suggestions, setSuggestions] = useState([])
	const [selectedArea, setSelection] = useState(null)
	const [areaTot, setTot] = useState(0)

	useEffect(() => {
		fetch(
			`https://loadshedding.eskom.co.za/LoadShedding/GetSurburbData/?pageSize=10000&pageNum=1&id=${props.id}`
		)
			.then((data) => data.json())
			.then((json) => {
				setAreas(json.Results)
			})
			.catch((err) => console.error(err))
	}, [props.id])

	const onSuggestHandler = (text) => {
		setText(text)
		setSuggestions([])
		const sel = currentAreas.findIndex((tx) => tx.text === text)
		const total = currentAreas[sel].Tot
		setTot(total)
		setSelection(sel)
		console.log(total)
	}

	const onChangeHandler = (text) => {
		let matches = []
		if (text.length > 0) {
			matches = currentAreas.filter((area) => {
				const regex = new RegExp(`${text}`, 'gi')
				area.text.match(regex)
				return area.text.match(regex)
			})
		}
		setSuggestions(matches)
		setText(text)
	}

	if (props.id === null) return <></>
	else
		return (
			<Container>
				<SearchContext.Provider value={selectedArea}>
					<TotalContext.Provider value={areaTot}>
						<Input
							onChange={(e) => onChangeHandler(e.target.value)}
							placeholder="Search for Area"
							value={text}
						></Input>
						<UnorderedList>
							{suggestions &&
								suggestions.map((suggestion, i) => (
									<Suggestion
										key={i}
										onClick={() => onSuggestHandler(suggestion.text)}
										onBlur={() => {
											setTimeout(() => {
												setSuggestions([])
											}, 1000)
										}}
									>
										{suggestion.text}
									</Suggestion>
								))}
						</UnorderedList>
						<Table />
					</TotalContext.Provider>
				</SearchContext.Provider>
			</Container>
		)
}

export default Search
