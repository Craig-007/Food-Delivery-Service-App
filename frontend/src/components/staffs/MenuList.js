import React, { Component } from 'react'
import { Card, Table } from 'semantic-ui-react';
import myAxios from '../../webServer.js'
import EditMenuModal from './EditMenuModal.js';

class MenuList extends Component {

    constructor(props) {
        super(props)
        this.state = {
            isLoading: true,
            restaurantMenu: [],
            currentRestaurant: props.restaurant
        }
        this.updateMenu(props.restaurant)
    }

    updateMenu = rname => {
        myAxios.get('/restaurant_items', {
          params: {
              restaurant: rname
          }
        })
        .then(response => {
          console.log(response);
          this.setState({
            restaurantMenu: response.data.result,
            isLoading: false
          })
        })
        .catch(error => {
          console.log(error);
        });
    }

    componentWillReceiveProps(nextProps) {
      this.setState({ 
          currentRestaurant: nextProps.restaurant,
          isLoading: true 
      });  
      this.updateMenu(nextProps.restaurant)
    }
    

    render() {
        if (this.state.isLoading) {
            return null// <Loader active/>
          }
          return (
            <Card color='red' style={{maxWidth: 250}}>
              <Card.Content>
                <Card.Header>Menu</Card.Header>
              </Card.Content>
              <Card.Content>
                <Table basic='very' celled>
                    <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>Item</Table.HeaderCell>
                        <Table.HeaderCell>Avail.</Table.HeaderCell>
                    </Table.Row>
                    </Table.Header>
                    <Table.Body>
                    {this.state.restaurantMenu.map((item) => (
                        <Table.Row key={item[0]}>
                            <Table.Cell>
                                {item[0]}
                            </Table.Cell>
                            <Table.Cell>
                                {item[1]}
                            </Table.Cell>
                        </Table.Row>
                    ))}
                    </Table.Body>
                </Table>
              </Card.Content>
              <Card.Content>
                <EditMenuModal restaurant={this.state.currentRestaurant} submitHandler={this.updateMenu}/>
              </Card.Content>
            </Card>
          )
    }
}   

export default MenuList;