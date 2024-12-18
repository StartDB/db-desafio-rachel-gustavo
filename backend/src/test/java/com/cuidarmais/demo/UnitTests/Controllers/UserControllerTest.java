package com.cuidarmais.demo.UnitTests.Controllers;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;

import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.test.web.servlet.MockMvc;

import com.cuidarmais.demo.Controllers.UserController;
import com.cuidarmais.demo.DTO.LoginDTO;
import com.cuidarmais.demo.Services.UserService;

@WebMvcTest(UserController.class)
public class UserControllerTest {

    @Autowired
    MockMvc mockMvc;

    @MockitoBean
    UserService userService;

    @Test
    void testLoginSuccess() throws Exception {
        String loginJson = """
        {
          "username": "kendallroy",
          "password": "iwantbemydad123"
        }
        """;

        Mockito.when(userService.login(Mockito.any(LoginDTO.class)))
                .thenReturn(ResponseEntity.ok("Login realizado com sucesso!"));

        mockMvc.perform(post("/user/login")
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(loginJson))
            .andExpect(status().isOk())
            .andExpect(content().string("Login realizado com sucesso!"));
    }

    @Test
    void testLoginUserNotFound() throws Exception {
        String loginJson = """
        {
          "username": "shivroy",
          "password": "ihatetom"
        }
        """;

        Mockito.when(userService.login(Mockito.any(LoginDTO.class)))
                .thenReturn(ResponseEntity.badRequest().body("Usuário não encontrado."));

        mockMvc.perform(post("/user/login")
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(loginJson))
            .andExpect(status().isBadRequest())
            .andExpect(content().string("Usuário não encontrado."));
    }

    @Test
    void testLoginIncorrectPassword() throws Exception {
        String loginJson = """
        {
          "username": "romanroy",
          "password": "gerri"
        }
        """;

        Mockito.when(userService.login(Mockito.any(LoginDTO.class)))
                .thenReturn(ResponseEntity.badRequest().body("Senha inválida"));

        mockMvc.perform(post("/user/login")
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(loginJson))
            .andExpect(status().isBadRequest())
            .andExpect(content().string("Senha inválida"));
    }

    @Test
    void testLoginUnexpectedError() throws Exception {
        String loginJson = """
        {
          "username": "greghirschen",
          "password": "securepassword"
        }
        """;

        Mockito.when(userService.login(Mockito.any(LoginDTO.class)))
                .thenReturn(ResponseEntity.badRequest().body("Erro ao tentar realizar o login"));

        mockMvc.perform(post("/user/login")
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(loginJson))
            .andExpect(status().isBadRequest())
            .andExpect(content().string("Erro ao tentar realizar o login"));
    }
}
