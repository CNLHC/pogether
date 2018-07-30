import React from 'react'
import { Layout, Menu } from 'antd';
import { Route, Link } from 'react-router-dom'
import ListEntries from '../ListEntries/index'
import { fetchDocs } from "./action";
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom'
import mainLogo from './logo.png'
import './index.scss'


const { Header, Content, Sider } = Layout;


class mainPage extends React.Component {
    componentDidMount() {
        this.props.dispatch(fetchDocs())
    }
    render() {
        const ListWrap = ({ match }) => <ListEntries docName={match.params.doc} />
        const MenuItem = []
        this.props.docs.map(e => MenuItem.push(
            <Menu.Item key={e.id}><Link to={"/docName/" + e.Name + "/"}>{e.Name}</Link></Menu.Item>)
        );
        return (
            <Layout>
                <Header className="frame-header" style={{ fontcolor: "black", backgroundColor: "#ffffff" }}>
                    <div className="logo">
                        <img alt= "logo" src={mainLogo} height={"64px"} />
                        <span style={{ paddingLeft: "20px" }}>
                            中文文档翻译
                    </span>
                    </div>
                </Header>
                <Content style={{ padding: '24px 50px' }}>
                    <Layout style={{ background: '#fff' }}>
                        <Sider width={200} style={{ background: '#fff' }}>
                            <Menu
                                mode="inline"
                                defaultSelectedKeys={['1']}
                                defaultOpenKeys={['sub1']}
                                style={{ height: '100%' }}
                            >
                                {MenuItem}
                            </Menu>
                        </Sider>
                        <Content className="frame-content">
                            <Route exact path={'/docName/:doc/'} component={ListWrap} />
                        </Content>
                    </Layout>
                </Content>
            </Layout>
        );
    }
}

function mapStateToProps(state) {
    return {
        docs: state.Framework.docs,
        loading: state.Framework.loading
    }
}
const MainPage = withRouter(connect(mapStateToProps)(mainPage));

export default MainPage;
