package br.com.usuario_educai.projeto.DAO;

import java.util.Optional;

import org.springframework.data.repository.CrudRepository;

import br.com.usuario_educai.projeto.model.Usuario;

public interface IUsuario extends CrudRepository<Usuario, Integer> {
	Optional<Usuario> findByEmail(String email);
}
