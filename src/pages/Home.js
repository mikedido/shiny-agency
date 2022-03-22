import styled from 'styled-components'
import { useState } from 'react'
import colors from '../utils/style/colors'
import { StyledLink } from '../utils/style/atomes'
import { useTheme } from '../utils/hooks/index'
import HomeIllustration from '../assets/home-illustration.svg'

const Balloon = styled.div`
  height: 100px;
  width: 100px;
  border-radius: 50px;
  background-color: red;
  transform: scale(${({ size }) => size});
`;

/*function Home() {
  const [size, updateSize] = useState(1)
  
  return (
    <HomeContainer>
      <h1 onClick={ () => updateSize(size + 0.1 )}>Page d'accueil</h1>
      <Balloon size={size} />
    </HomeContainer>
  )
}*/

const HomeWrapper = styled.div`
  display: flex;
  justify-content: center;
`

const HomerContainer = styled.div`
  margin: 30px;
  background-color: ${({ theme }) =>
    theme === 'light' ? colors.backgroundLight : colors.backgroundDark};
  padding: 60px 90px;
  display: flex;
  flex-direction: row;
  max-width: 1200px;
`

const LeftCol = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  flex: 1;
  ${StyledLink} {
    max-width: 250px;
  }
`

const StyledTitle = styled.h2`
  padding-bottom: 30px;
  max-width: 280px;
  line-height: 50px;
  color: ${({ theme }) => (theme === 'light' ? '#000000' : '#ffffff')};
`

const Illustration = styled.img`
  flex: 1;
`


function Home() {

  const { theme } = useTheme();

  return (
    <HomeWrapper>
      <HomerContainer theme={theme}>
        <LeftCol>
          <StyledTitle theme={theme}>
            Repérez vos besoins, on s’occupe du reste, avec les meilleurs
            talents
          </StyledTitle>
          <StyledLink to="/survey/1" $isFullLink>
            Faire le test
          </StyledLink>
        </LeftCol>
        <Illustration src={HomeIllustration} />
      </HomerContainer>
    </HomeWrapper>
  )
}


export default Home;