@echo off

:: Setup
echo Setting up deployment...
IF NOT DEFINED DEPLOYMENT_TARGET (
  SET DEPLOYMENT_TARGET=%~dp0%..\wwwroot
)

:: 1. KuduSync
echo Syncing files...
IF /I "%IN_PLACE_DEPLOYMENT%" NEQ "1" (
  call :ExecuteCmd "%KUDU_SYNC_CMD%" -v 50 -f "%DEPLOYMENT_SOURCE%" -t "%DEPLOYMENT_TARGET%" -n "%NEXT_MANIFEST_PATH%" -p "%PREVIOUS_MANIFEST_PATH%" -i ".git;.hg;.deployment;deploy.cmd"
  IF !ERRORLEVEL! NEQ 0 goto error
)

:: 2. Install npm packages
echo Installing npm packages...
pushd "%DEPLOYMENT_TARGET%"
call :ExecuteCmd npm install --production
IF !ERRORLEVEL! NEQ 0 goto error
popd

:: Done
echo Deployment complete.
goto end

:ExecuteCmd
setlocal
set _CMD=%*
call %_CMD%
if "%ERRORLEVEL%" NEQ "0" echo Failed executing '%_CMD%'
exit /b %ERRORLEVEL%

:error
echo An error occurred during deployment.
exit /b 1

:end
echo Deployment script completed successfully.
