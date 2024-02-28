import { Button } from "@chakra-ui/button";
import { FormControl, FormLabel } from "@chakra-ui/form-control";
import { Input, InputGroup, InputRightElement } from "@chakra-ui/input";
import { VStack } from "@chakra-ui/layout";
import { useToast } from "@chakra-ui/toast";
import { useState } from "react";


const Login = () => {
    const [show, setShow] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");


    const handleClick = () => {
        setShow(!show);
    }

    const submitHandler = () => {

    }

    return <VStack>


        {/* email */}
        <FormControl id='email' isRequired>
            <FormLabel>Email</FormLabel>
            <Input
                value={email}
                placeholder="Enter your email"
                onChange={(e) => setEmail(e.target.value)}
            />
        </FormControl>

        {/* password */}
        <FormControl id='password' isRequired>
            <FormLabel>Password</FormLabel>
            <InputGroup>
                <Input
                    value={password}
                    type={show ? 'text' : 'password'}
                    placeholder="Password"
                    onChange={(e) => setPassword(e.target.value)}
                />
                <InputRightElement width='4.5rem'>
                    <Button h='1.75rem' size='sm' onClick={handleClick}>
                        {show ? "Hide" : "Show"}
                    </Button>
                </InputRightElement>
            </InputGroup>
        </FormControl>

        {/* submit button */}
        <Button variant='solid' colorScheme='blue' width='100%' style={{marginTop: 15}} onClick={submitHandler}>
            Login
        </Button>

        {/* guest credentials */}
        <Button variant='solid' colorScheme='red' width='100%' style={{marginTop: 15}} onClick={ () =>{
            setEmail('guest@gmail.com');
            setPassword('guest1234')
        }}>
            Guest Credentials
        </Button>
    </VStack>
}

export default Login;
