import * as React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { IUser } from './user';
import Context from './UserContext';


interface IProps extends RouteComponentProps<{}> {
    user: IUser;
}

interface IState {
    age: string;
    description: string;
    name: string;
    occupation: string;
}

class EditForm extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);
        this.state = {
            // assume one user is passed to page
            age: props.user.age,
            description: props.user.description,
            name: props.user.name,
            occupation: props.user.occupation,
        };
    }

    public render() {
        return (
            <div>
                <h1>{this.state.name}</h1>
                <div>
                    <p>Name:</p>
                    <input type="text" name="name" value={this.state.name} onChange={this.handleChange} />
                    <p>Age:</p>
                    <input type="text" name="age" value={this.state.age} onChange={this.handleChange} />
                    <p>Occupation:</p>
                    <input type="text" name="occupation" value={this.state.occupation} onChange={this.handleChange} />
                    <p>Description:</p>
                    <textarea name="description" value={this.state.description} onChange={this.handleChange} />
                    <br />
                    <Context.Consumer>
                        {({updateUser}) => (
                        <button
                            onClick={this.handleClick(updateUser)}
                        >
                            Submit
                        </button>
                        )}
                    </Context.Consumer>
                </div>
            </div >
        );
    }

    private handleChange = (event: any) => {
        this.setState({ [event.target.name]: event.target.value } as Pick<IState, keyof IState>);
    }

    private handleClick = (updateUser: (userId: number, data: IUser) => void) => 
        //  this.props.updateUser(this.props.user.userId, { name: this.state.name, age: this.state.age, description: this.state.description, occupation: this.state.occupation, userId: this.props.user.userId });
        (event: React.FormEvent<HTMLButtonElement>) => {
            event.preventDefault();
            updateUser(this.props.user.userId, { ...this.state, userId: this.props.user.userId });
        }
    
}

export default EditForm;