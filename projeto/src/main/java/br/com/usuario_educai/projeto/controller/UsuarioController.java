package br.com.usuario_educai.projeto.controller;

import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

import br.com.usuario_educai.projeto.DAO.IUsuario;
import br.com.usuario_educai.projeto.model.Usuario;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@CrossOrigin("*")
@RequestMapping("/usuario")
public class UsuarioController {

    @Autowired
    private IUsuario dao;

   

    // Endpoints relacionados aos usuários
    @GetMapping
    public List<Usuario> listaUsuarios() {
        return (List<Usuario>) dao.findAll();
    }

    @PostMapping
    public Usuario criarUsuario(@RequestBody Usuario usuario) {
        return dao.save(usuario);
    }

    @PutMapping
    public Usuario editarUsuario(@RequestBody Usuario usuario) {
        return dao.save(usuario);
    }

    @DeleteMapping("/{id}")
    public Optional<Usuario> excluirUsuario(@PathVariable Integer id) {
        Optional<Usuario> usuario = dao.findById(id);
        dao.deleteById(id);
        return usuario;
    }

    @PostMapping("/login")
    public ResponseEntity<?> loginUsuario(@RequestBody Usuario usuario) {
        Optional<Usuario> usuarioEncontrado = dao.findByEmail(usuario.getEmail());
        if (usuarioEncontrado.isPresent()) {
            if (usuario.getSenha().equals(usuarioEncontrado.get().getSenha())) {
                return ResponseEntity.ok(usuarioEncontrado.get());
            } else {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Senha incorreta");
            }
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Usuário não encontrado");
        }
    }
   
}

