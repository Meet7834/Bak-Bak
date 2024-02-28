import { Button } from "@chakra-ui/button";
import { FormControl, FormLabel } from "@chakra-ui/form-control";
import { Input, InputGroup, InputRightElement } from "@chakra-ui/input";
import { VStack } from "@chakra-ui/layout";
import { useToast } from "@chakra-ui/toast";
import { useState } from "react";


const SignUp = () => {
    const [show, setShow] = useState(false);
    const [name, setName] = useState();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [confirmpassword, setConfirmpassword] = useState();
    const [pic, setPic] = useState();
    const [picLoading, setPicLoading] = useState(false);


    const handleClick = () => {
        setShow(!show);
    }

    const postDetails = (pics) => {

    }

    const submitHandler = () => {

    }

    return <VStack>

        {/* name */}
        <FormControl id='firstName' isRequired>
            <FormLabel>Name</FormLabel>
            <Input
                placeholder="Enter your name"
                onChange={(e) => setName(e.target.value)}
            />
        </FormControl>

        {/* email */}
        <FormControl id='email' isRequired>
            <FormLabel>Email</FormLabel>
            <Input
                placeholder="Enter your email"
                onChange={(e) => setEmail(e.target.value)}
            />
        </FormControl>

        {/* password */}
        <FormControl id='password' isRequired>
            <FormLabel>Password</FormLabel>
            <InputGroup>
                <Input
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

        {/* confirm password */}
        <FormControl id='confirmPassword' isRequired>
            <FormLabel>Confirm Password</FormLabel>
            <InputGroup>
                <Input
                    type={show ? 'text' : 'password'}
                    placeholder="Confirm Password"
                    onChange={(e) => setConfirmpassword(e.target.value)}
                />
                <InputRightElement width='4.5rem'>
                    <Button h='1.75rem' size='sm' onClick={handleClick}>
                        {show ? "Hide" : "Show"}
                    </Button>
                </InputRightElement>
            </InputGroup>
        </FormControl>

        {/* upload pic */}
        <FormControl id="profilePic">
            <FormLabel>Upload your Picture</FormLabel>
            <Input
                type="file"
                p='1.5'
                accept="image/*"
                onChange={(e) => postDetails(e.target.files[0])}
            />
        </FormControl>

        {/* submit button */}
        <Button colorScheme='blue' width='100%' style={{marginTop: 15}} onClick={submitHandler}>
            Sign Up
        </Button>
    </VStack>
}

export default SignUp;
