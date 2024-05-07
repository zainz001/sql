//use effect and use state its works like this react query
// import Stories from "../../components/stories/Stories"
 import Share from "../../component/createpost/createpost"
import Posts from "../../component/posts/posts"
import "./home.css"

const Home = () => {
  return (
    <div className="home">
      {/* <Stories/>*/}
      <Share/>
      <Posts/> 
    </div>
  )
}

export default Home