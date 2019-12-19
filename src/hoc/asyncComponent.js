import React, {Component} from 'react';

//importComponent powinien być funkcją (patrz w Blog), żeby można było ją w wykonać w componentdidMount
const asyncComponent = (importComponent) => {
    return class extends Component {

        state = {
            component: null
        }

        componentDidMount() {
            importComponent()
                .then(cmp => {
                    this.setState({component: cmp.default});
                });
        }

        render() {
            const C = this.state.component;

            return C ? <C {...this.props}/> : null;
        }
    }
}

export default asyncComponent;