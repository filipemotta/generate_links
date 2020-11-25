import React from 'react';
import Header from '../../components/Header';
import { Container }  from 'react-bootstrap';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';

import ShortenerService from '../../services/shortenerService';
import {StatsRow, StatsBox, StatsBoxTitle, StatsContainer} from './styles';
import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';



class StatsPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isLoading: false,
            shortenedURL: {},
            errorMessage: ''
        }
    }

    async componentDidMount() {
        const code = this.props.match.params.code;

        try {
            const service = new ShortenerService();
            const shortenedURL = await service.getStats(code);

            this.setState({isLoading: false, shortenedURL});
        } catch (error) {
            this.setState({isLoading: false, errorMessage: 'The URL requested does not exist'});
        }
    }

    render() {
        const {errorMessage, shortenedURL} = this.state;
        return (
            <Container>
                <Header>Estatísticas</Header>
                {errorMessage ? (
                    <StatsContainer className="text-center">
                        <FontAwesomeIcon size="3x" color="#f8d7da" icon="exclamation-triangle" />
                        <p className="mb-3">{errorMessage}</p>
                        <a className="btn btn-primary" href="/">Short new URL</a>
                    </StatsContainer>
                ) : (
                    <StatsContainer className="text-center">
                        <p><b>http://generatelink/{shortenedURL.code}</b></p>
                        <p>Redirect to:<br />{shortenedURL.url}</p>
                        <StatsRow>
                            <StatsBox>
                                <b>{shortenedURL.hits}</b>
                                <StatsBoxTitle>Visitas</StatsBoxTitle>
                            </StatsBox>
                            <StatsBox>
                                <b>{shortenedURL.relativeDate}</b>
                                <StatsBoxTitle>Últimas Visitas</StatsBoxTitle>
                            </StatsBox>
                        </StatsRow>
                        <a className="btn btn-primary" href="/">Short new URL</a>
                    </StatsContainer>
                )}
            </Container>
        )
    }
}

export default StatsPage;