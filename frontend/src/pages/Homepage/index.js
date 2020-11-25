import React from 'react';
import {Container, InputGroup, FormControl, Button, Alert, Spinner} from 'react-bootstrap';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import Header from '../../components/Header';
import {ContentContainer, Form} from './styles';
import ShortenerService from '../../services/shortenerService';



class HomePage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isLoading: false,
            url: '',
            code: '',
            errorMessage: ''
        }

    }

    handleSubmit = async (event) => {
        event.preventDefault();
        const {url} = this.state;

        this.setState({ isLoading: true, errorMessage:'' });

        if(!url) {
            this.setState({ isLoading: false, errorMessage:'Type a valid URL to short' });
        }else {
            try {
                const service = new ShortenerService();
                const result = await service.generate({url});

                this.setState({ isLoading: false, code: result.code });
            } catch (error) {
                this.setState({ isLoading: true, errorMessage:'An error ocurred while trying to short URL, try again' });
            }
        }
    }

    copyToClipboard = () => {
        const element =  this.inputURL;
        element.select();
        document.execCommand('copy');
    }
 
    render() {
        const {isLoading, code, errorMessage} = this.state; 
        return (
            <Container>
            <Header>URL Shortener</Header>
            <ContentContainer>
                <Form onSubmit={this.handleSubmit}>
                    <InputGroup className="mb-3">
                        <FormControl 
                        placeholder="Type an URL"
                        defaultValue=""
                        onChange={(e) => this.setState({ url: e.target.value })}
                        />
                        <InputGroup.Append>
                        <Button variant="primary" type="submit">URL Shorter</Button>
                    </InputGroup.Append>
                    </InputGroup>
                    {isLoading ? (
                        <Spinner animation="border"/>
                    ): (
                       code && (
                           <>
                                <InputGroup className="mb-3">
                                <FormControl 
                                autoFocus={true}
                                defaultValue={`http://generatelink/${code}`}
                                ref={(input) => this.inputURL = input}
                                />
                                <InputGroup.Append>
                                <Button variant="outline-secondary" onClick={() => this.copyToClipboard()} >Copiar</Button>
                                </InputGroup.Append>
                                </InputGroup>
                                <p>To view stats please visit http://generatelink/{code}</p>
                           </>
                       ) 
                    )}
                    {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}
                </Form>
            </ContentContainer>
            </Container>
        )
    }
}

export default HomePage;