import React from 'react';
import './leftDrawer.css'
import MenuItem from './menuItem/menuItem.js'


class RightDrawer extends React.Component {
    constructor(props) {
       super(props);
       this.state = {
           menuItems: [
               {text: "Coming Soon", primary: false, faded: true},
               {text: "Coming Soon", primary: false, faded: true},
               {text: "Coming Soon", primary: false, faded: true},
               {text: "Log Out", primary: true, faded: false, func: this.props.clickLogout}
           ]
       };
     }


    render() {
        const openDrawer = this.props.open === true ? "open" :  "closed";

        return (
            <div id="leftDrawerContainer" className={openDrawer}>
                <button className="shade" onClick={this.props.toggleLeftDrawer}></button>
                <div id="leftDrawer">
                    <div id="user">
                        <div className="user-icon">
                            <i className="material-icons">person</i>
                        </div>
                        <div className="user-email">
                            thisguy@thisgal.net
                        </div>
                    </div>

                    <div id="leftMenuItems">
                        {this.state.menuItems.map((obj, index) => {
                            return (
                                <MenuItem
                                    key={index}
                                    text={this.state.menuItems[index].text}
                                    isPrimaryItem={this.state.menuItems[index].primary}
                                    isFadedItem={this.state.menuItems[index].faded}
                                    func={this.state.menuItems[index].func}
                                />
                            );
                        })}
                    </div>

                    <div id="version-number"> Alpha v1.0 </div>
                </div>
            </div>
        );
    };
}

export default RightDrawer;
