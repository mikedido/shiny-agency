import { Link } from 'react-router-dom'
import styled from 'styled-components'
import colors from '../../utils/style/colors'
import DarkLogo from '../../assets/dark-logo.png'
import { StyledLink } from '../../utils/style/atomes'

const HomeLogo = styled.img`
  height: 70px;
`

const NavContainer = styled.nav`
  padding: 30px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`

function Header() {
    return (
        <NavContainer>
            <Link to='/'>
                <HomeLogo src={DarkLogo} />
            </Link>
            <div>
                <StyledLink to="/" $isFullLink>Accueil</StyledLink>
                <StyledLink to="/survey/1" $isFullLink>Questionnaire</StyledLink>
                <StyledLink to="/freelances" $isFullLink>Profils</StyledLink>
            </div>
        </NavContainer>
        
    )
}

export default Header;