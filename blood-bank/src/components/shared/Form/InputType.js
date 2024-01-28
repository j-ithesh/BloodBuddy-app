import React from 'react'

const InputType = ({labelFor,labelText,InputType,value,onChange,name}) => {
  return (
    <>
    <div className="mb-2">
    <label htmlFor={labelFor} className="form-label">{labelText}</label>
    <input type={InputType} className="form-control" name={name}value={value}onChange={onChange}/>
    </div>
    </>
  )
}

export default InputType
