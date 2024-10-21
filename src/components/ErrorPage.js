import {Link} from 'react-router-dom'

const ErrorPage = () => {
  return (
    <div>
        <h1>Error, táto stránka neexistuje</h1>  
        <Link to="/">Klikni sem a poď na hlavnú stránku</Link>

    </div>
  )
}

export default ErrorPage