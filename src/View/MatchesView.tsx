import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { getMatches } from 'state/support/selectors'
import { getAllMatches, getMatchesByPlayerId } from 'utils/firestoreUtils'
import { Match } from 'types/match'
import { User } from 'types/user'
import { Text } from 'react-native'
import { Container } from 'components/core/Container/Container'
import {
  FlexAlignItems,
  FlexDirection,
  FlexJustifyContent,
  SizesPx
} from 'components/core/Container/enum'
import MatchSlider from 'components/Matches/MatchSlider'
import MatchCreate from 'components/Matches/MatchCreate'
import { COLORS } from 'components/constantStyle'
import { TextProps } from 'react-native/Libraries/Text/Text'
import { useResponsiveValue } from 'components/core/utils'
import { getUser } from 'state/auth/selectors'

interface MatchesViewProps {
  user?: User
}

const MatchesView: React.FC<MatchesViewProps> = () => {
  const user: User = useSelector(getUser)
  const matches = useSelector(getMatches) as Match[] // 👈 forza il tipo
  const uid = user?.user?.uid || ''

  useEffect(() => {
    const fetchMatches = async () => {
      await getAllMatches()
    }
    fetchMatches()
  }, [])

  const matchesByPlayerId = getMatchesByPlayerId(matches, uid) as Match[]
  const responsiveMainContainer = {
    width: '95vw',
    flexDirection: FlexDirection.COLUMN,
    flexGap: SizesPx.XL
  }

  const matchListConfig = {
    uid: user.user?.uid ?? '',
    matches: matches ?? []
  }

  const matchListByPayerConfig = {
    uid: user.user?.uid ?? '',
    matches: matchesByPlayerId ?? ([] as Match[])
  }
  const sectionTitleConfig = {
    children: `Partite Disponibili (${matches?.length ?? 0})`,
    style: {
      textAlign: 'center',
      color: COLORS.primaryText,
      paddingHorizontal: 16,
      fontSize: 28,
      fontWeight: 600
    }
  } as TextProps
  const wrapperConfig = {
    flexDirection: useResponsiveValue({
      mobile: FlexDirection.COLUMN,
      tablet: FlexDirection.ROW,
      desktop: FlexDirection.ROW
    }),
    backgroundColor: COLORS.secondaryBg,
    flexGap: SizesPx.XL,
    padding: SizesPx.L,
    flexAlignItems: FlexAlignItems.CENTER,
    borderRadius: SizesPx.XL,
    borderColor: COLORS.primaryColor,
    shadowColor: 'rgba(7, 244, 104, 1)',
    shadowOpacity: 0.4,
    shadowRadius: 15
  }
  const HeaderSectionConfig = {
    flexDirection: useResponsiveValue({
      mobile: FlexDirection.COLUMN,
      tablet: FlexDirection.ROW,
      desktop: FlexDirection.ROW
    }),
    flexGap: SizesPx.XL,
    flexJustifyContent: FlexJustifyContent.CENTER
  }
  return (
    <Container {...responsiveMainContainer}>
      <Container role={'region'} flexGap={SizesPx.M}>
        <Container {...HeaderSectionConfig}>
          <Text {...sectionTitleConfig} />
          <MatchCreate />
        </Container>
        <Container {...wrapperConfig}>
          {matches.length > 0 && <MatchSlider {...matchListConfig} />}
          {matches.length == 0 && (
            <Text {...sectionTitleConfig}>Non ci sono partite disponibili</Text>
          )}
        </Container>
      </Container>
      <Container role={'region'} flexGap={SizesPx.M}>
        <Text {...sectionTitleConfig}>Le tue partite</Text>
        <Container {...wrapperConfig}>
          {matchesByPlayerId?.length > 0 && (
            <MatchSlider {...matchListByPayerConfig} />
          )}
          {matchesByPlayerId?.length == 0 && (
            <Text {...sectionTitleConfig}>
              Non ti sei insctitto a nessuna partita{' '}
            </Text>
          )}
        </Container>
      </Container>
    </Container>
  )
}

export default MatchesView
