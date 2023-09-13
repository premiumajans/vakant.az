import { PropsWithChildren } from "react"


const Row = (props:PropsWithChildren) => {
  return (
    <div className="row"> {props.children} </div>
  )
}

export default Row