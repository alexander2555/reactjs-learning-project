import PropTypes from 'prop-types'
import { InfoLayout } from './InfoLayout'

export const Info = infoState => {
  return <InfoLayout {...infoState} />
}

Info.propTypes = {
  infoState: {
    isDraw: PropTypes.bool,
    winner: PropTypes.string,
    field: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.string)).isRequired,
    currentPlayer: PropTypes.string.isRequired,
  },
}
