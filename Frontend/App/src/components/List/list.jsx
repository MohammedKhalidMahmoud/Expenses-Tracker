import React from 'react'

export default function List(props) {
  return (
    <>
        <input list='expense-categories' value={props.category} onChange={e=>{props.setCategory(e.target.value)}} placeholder="Category" classvalue='mb-10'/>
            <datalist id="expense-categories">
                <option value="Food & Dining"/>
                <option value="Transportation"/>
                <option value="Housing"/>
                <option value="Entertainment"/>
                <option value="Shopping"/>
                <option value="Health & Fitness"/>
                <option value="Personal Care"/>
                <option value="Education"/>
                <option value="Travel"/>
                <option value="Miscellaneous"/>
            </datalist>
    </>
  )
}
