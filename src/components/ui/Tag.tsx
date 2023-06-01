interface Props {
  text:string
}
const Tag = ({text}:Props) => {
  return <div className="bg-gray-50 rounded-full text-xs text-gray-600 font-medium border -300 px-2 py-1 ">{text}</div>
}

export default Tag