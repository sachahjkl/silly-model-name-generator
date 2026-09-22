{
  description = "Model Nonsense static website";

  inputs = {
    nixpkgs.url = "https://flakehub.com/f/NixOS/nixpkgs/0.2605";
    git-hooks = {
      url = "https://flakehub.com/f/cachix/git-hooks.nix/0.1";
      inputs.nixpkgs.follows = "nixpkgs";
    };
  };

  outputs = {
    self,
    nixpkgs,
    git-hooks,
  }: let
    systems = ["x86_64-linux" "aarch64-linux"];
    forAllSystems = nixpkgs.lib.genAttrs systems;
  in {
    packages = forAllSystems (
      system: let
        pkgs = nixpkgs.legacyPackages.${system};
      in {
        default = pkgs.stdenvNoCC.mkDerivation {
          pname = "model-nonsense";
          version = "1.0.0";
          src = ./.;

          installPhase = ''
            runHook preInstall
            mkdir -p "$out"
            cp index.html styles.css app.js names.js .nojekyll "$out/"
            runHook postInstall
          '';
        };
      }
    );

    checks = forAllSystems (
      system: let
        pkgs = nixpkgs.legacyPackages.${system};
        preCommitCheck = git-hooks.lib.${system}.run {
          package = pkgs.prek;
          src = ./.;
          hooks = {
            alejandra.enable = true;
            check-added-large-files.enable = true;
            check-json.enable = true;
            check-merge-conflicts.enable = true;
            end-of-file-fixer.enable = true;
            prettier.enable = true;
            trim-trailing-whitespace.enable = true;
          };
        };
      in {
        build = self.packages.${system}.default;
        tests = pkgs.runCommand "model-nonsense-tests" {nativeBuildInputs = [pkgs.nodejs_24];} ''
          cp -r ${./.} source
          chmod -R u+w source
          cd source
          node --test
          touch "$out"
        '';
        pre-commit = preCommitCheck;
      }
    );

    formatter = forAllSystems (system: nixpkgs.legacyPackages.${system}.alejandra);

    devShells = forAllSystems (
      system: let
        pkgs = nixpkgs.legacyPackages.${system};
        preCommitCheck = self.checks.${system}.pre-commit;
      in {
        default = pkgs.mkShell {
          packages = [pkgs.nodejs_24 pkgs.python3] ++ preCommitCheck.enabledPackages;
          inherit (preCommitCheck) shellHook;
        };
      }
    );
  };
}
