import React, { Component } from 'react'
import './styles.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Card } from 'react-bootstrap'
import { Link } from 'react-router-dom';
import axios from 'axios'

export default class NewList extends Component {
  constructor(){
      super();
      this.state = {
        news: []
      };
  }  

  async componentDidMount(){
    this.getNews();
  }
  
  getNews = async () =>{
    const res = await axios.get('dirección del endpoint');
    this.setState({news: res.data.data});

  }
  
  render() {
    return (
        <div>
            <div className="flex-container">
                {this.state.news.map((newsItem,i) => {
                    return (
                        <div className="row" key={i}>
                            <div className="column">
                                <Card key={newsItem.id}>
                                    <Card.Img className="imgCard" src={newsItem.avatar} />
                                    <Card.Body className="bodyCard">
                                        <Card.Title>{newsItem.first_name}</Card.Title >
                                        <Link to={"/novedades/" + newsItem.id} className="btn btn-primary" style={{ margin: '4px' }}>
                                            See news in detail</Link>
                                    </Card.Body>
                                </Card>
                            </div>
                        </div>
                    )
                })
                }
            </div>
        </div>
    )
}
}

