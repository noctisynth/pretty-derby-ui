use chrono::NaiveDateTime;
use pretty_derby::Account;
use serde_json::{json, Value};

#[tauri::command]
async fn login(username: &str, password: &str) -> Result<Value, ()> {
    let mut account = Account::default();
    account.profile(username.to_string(), password.to_string());
    if let Err(e) = account.login().await {
        return Ok(json!({"status": false, "msg": e.to_string(), "account": Value::Null}));
    };
    if let Err(e) = account.get_state().await {
        return Ok(json!({"status": false, "msg": e.to_string()}));
    };
    Ok(
        json!({"status": true, "account": serde_json::to_value(account).unwrap(), "msg": "Login successful!"}),
    )
}

#[tauri::command]
async fn upload(mut account: Account, mileage: f64, time: String) -> Result<Value, ()> {
    if let Err(e) = account.login().await {
        return Ok(json!({"status": false, "msg": e.to_string()}));
    };
    if let Err(e) = account.get_state().await {
        return Ok(json!({"status": false, "msg": e.to_string()}));
    };
    if let Err(e) = account
        .upload_running(
            mileage,
            match NaiveDateTime::parse_from_str(&time, "%Y/%m/%d %H:%M:%S") {
                Ok(t) => t,
                Err(e) => {
                    return Ok(json!({"status": false, "msg": e.to_string()}));
                }
            },
            None,
        )
        .await
    {
        return Ok(json!({"status": false, "msg": e.to_string()}));
    };
    Ok(json!({"status": true, "msg": "Running data uploaded successfully!"}))
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_shell::init())
        .invoke_handler(tauri::generate_handler![login, upload])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
