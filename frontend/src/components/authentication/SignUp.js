import { Button, FormControl, FormLabel, Input, InputGroup, InputRightElement, VStack, useToast } from '@chakra-ui/react';
import React, { useState } from 'react'
import axios from 'axios'
import { useHistory } from 'react-router-dom'

const SignUp = () => {
  const [show, setShow] = useState(false)
  const [name, setName] = useState()
  const [email, setEmail] = useState()
  const [password, setPassword] = useState()
  const [confirmPassword, setConfirmPassword] = useState()
  const [pic, setPic] = useState()
  const [loading, setLoading] = useState(false)
  const toast = useToast()
  const history = useHistory()

  const handleClick = () => setShow(!show)

  const postDetails = (pics) => {
    setLoading(true)
    if (pics === undefined) {
      toast({
        title: 'Please Select an Image',
        status: 'warning',
        duration: 5000,
        isClosable: true,
        position: 'bottom'
      })
      return
    }
    if (pics.type === 'image/jpeg' || pics.type === 'image/png') {
      const data = new FormData()
      data.append('file', pics)
      data.append('upload_preset', 'chat-app')
      data.append('cloud-name', 'dpanwega6')
      fetch('https://api.cloudinary.com/v1_1/dpanwega6/image/upload', {
        method: 'post',
        body: data,
      }).then((res) => res.json())
        .then((data) => {
          console.log(data)
          setPic(data.url.toString())
          setLoading(false)
        })
        .catch((err) => {
          console.log(err)
          setLoading(false)
        })
    } else {
      toast({
        title: 'Please Select an Image',
        status: 'warning',
        duration: 5000,
        isClosable: true,
        position: 'bottom'
      })
      return
    }
  }

  const submitHandler = async () => {
    setLoading(true)
    if (!name || !email || !password || !confirmPassword) {
      toast({
        title: 'Please Fill all the fields',
        status: 'warning',
        duration: 5000,
        isClosable: true,
        position: 'bottom'
      })
      setLoading(false)
      return
    }

    if (password !== confirmPassword) {
      toast({
        title: 'Passwords do not match',
        status: 'warning',
        duration: 5000,
        isClosable: true,
        position: 'bottom'
      })
      setLoading(false)
      return
    }

    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        }
      }
      const { data } = await axios.post("/api/user", { name, email, password, pic }, config)

      toast({
        title: 'Registration Successful',
        status: 'success',
        duration: 5000,
        isClosable: true,
        position: 'bottom'
      })
      localStorage.setItem('userInfo', JSON.stringify(data))
      setLoading(false)
      history.push('/chats')
    } catch (err) {
      toast({
        title: 'Error occured!',
        // description: err.response.data.message,
        status: 'error',
        duration: 5000,
        isClosable: true,
        position: 'bottom'
      })
      setLoading(false)
      console.log(err)
    }

  }

  return (
    <VStack spacing="5px">

      {/* Name */}
      <FormControl id="first-name" isRequired>
        <FormLabel>Name</FormLabel>
        <Input
          placeholder="Enter Your Name"
          onChange={(e) => setName(e.target.value)}
        />
      </FormControl>

      {/* Email */}
      <FormControl id="email" isRequired>
        <FormLabel>Email Address</FormLabel>
        <Input
          type="email"
          placeholder="Enter Your Email Address"
          onChange={(e) => setEmail(e.target.value)}
        />
      </FormControl>

      {/* Password */}
      <FormControl id="password" isRequired>
        <FormLabel>Password</FormLabel>
        <InputGroup size="md">
          <Input
            type={show ? "text" : "password"}
            placeholder="Enter Password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <InputRightElement width="4.5rem">
            <Button h="1.75rem" size="sm" onClick={handleClick}>
              {show ? "Hide" : "Show"}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>

      {/* Confirm Password */}
      <FormControl id="password" isRequired>
        <FormLabel>Confirm Password</FormLabel>
        <InputGroup size="md">
          <Input
            type={show ? "text" : "password"}
            placeholder="Confirm password"
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <InputRightElement width="4.5rem">
            <Button h="1.75rem" size="sm" onClick={handleClick}>
              {show ? "Hide" : "Show"}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>

      {/* Picture Upload */}
      <FormControl id="pic">
        <FormLabel>Upload your Picture</FormLabel>
        <Input
          type="file"
          p={1.5}
          accept="image/*"
          onChange={(e) => postDetails(e.target.files[0])}
        />
      </FormControl>

      <Button
        colorScheme="blue"
        width="100%"
        style={{ marginTop: 15 }}
        onClick={submitHandler}
        isLoading={loading}
      >
        Sign Up
      </Button>
    </VStack>
  );
}

export default SignUp